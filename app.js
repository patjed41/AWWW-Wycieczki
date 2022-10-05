import express from 'express';
import { body, param, validationResult } from 'express-validator';
import bodyParser from 'body-parser';

const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('style'));
app.use(express.static('pictures'));
app.use(express.static('js'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import session from 'express-session';
app.use(session({
  secret: 'secret wycieczka',
  resave: false,
  saveUninitialized: true
}));

import { checkConnectionWithDatabase } from './js/database.mjs';

import { getAvailableTrips, getAvailableTrip, addReservationToDatabase, addUserToDatabase,
  getUser, getReservationsOfUser } from './js/db_helpers.js';

import { checkGroup, checkTripId, parseErrorsToArray } from './js/helpers.js';

await checkConnectionWithDatabase();

app.use((req, res, next) => {
  var todayDate = new Date().toISOString().slice(0, 10);

  const maintenanceDate = '2022-04-16';
  if (todayDate === maintenanceDate) {
    res.send('Przerwa techniczna');
    return;
  }

  res.locals.dateInfo = 'Żądanie nastąpiło w dniu ' + todayDate;
  next();
});

app.get('/data', (req, res) => {
  res.status(200).send(res.locals.dateInfo);
})

app.get('/index', async (req, res) => {
  const available_trips = await getAvailableTrips();
  const groups = Math.max(Math.floor((available_trips.length + 2) / 3), 1);
  const group = checkGroup(req, res, groups);
  const trips_to_render = available_trips.slice(group * 3, group * 3 + 3);
  res.render('index', { trips: trips_to_render, group: group, groups: groups });
})

app.get('/wycieczka', async (req, res) => {
  const id = checkTripId(req, res);
  const trip = await getAvailableTrip(id);
  if (trip === null) {
    res.status(404).send('Wrong trip ID.');
  }
  
  res.render('wycieczka', { trip: trip });
})

app.get('/form', async (req, res) => {
  const id = checkTripId(req, res);
  const trip = await getAvailableTrip(id);
  if (trip === null) {
    res.status(404).send('Wrong trip ID.');
  }
  else if (req.session.email === undefined) {
    res.render('form', { logged: false, trip: trip, errors: [] });
  }
  else {
    res.render('form', { logged: true, trip: trip, errors: [] });
  }
})

app.post('/form',
  body('zgloszenia')
    .notEmpty()
    .withMessage('Liczba zgłoszeń jest wymagana. ')
    .isInt({ min: 1 })
    .withMessage('Niepoprawna liczba zgłoszeń. '),
  async (req, res) => {
    const errors = validationResult(req).array();
    const id = checkTripId(req, res);
    const trip = await getAvailableTrip(id);
    if (trip === null) {
      res.status(404).send('Wrong trip ID.');
      return;
    }
    if (errors.length > 0) {
      const errorMessages = parseErrorsToArray(errors);
      res.render('form', { trip: trip, errors: errorMessages });
    }
    else if (req.session.email === undefined) {
      res.render('form', { logged: false, trip: trip, errors: [] });
    }
    else {
      const user = await getUser(req.session.email, null);
      const added = await addReservationToDatabase(id, user.id, user.name, user.surname, user.email, req.body.zgloszenia);
      if (added) {
        res.render('form-sukces', { trip: trip , places: req.body.zgloszenia });
      }
      else {
        res.render('form', { logged: true, trip: trip, errors: [ 'Rezerwacja się nie powiodła. ' ] });
      }
    }
  }
)

app.get('/rejestracja', (req, res) => {
  if (req.session.email === undefined) {
    res.render('rejestracja', { errors: [] });
  }
  else {
    res.redirect('/index?grupa=0');
  }
})

app.post('/rejestracja',
  body('imie')
    .notEmpty()
    .withMessage('Imię jest wymagane. '),
  body('nazwisko')
    .notEmpty()
    .withMessage('Nazwisko jest wymagane. '),
  body('email')
    .notEmpty()
    .withMessage('Email jest wymagany. ')
    .isEmail()
    .withMessage('Niepoprawny email. '),
  body('haslo')
    .notEmpty()
    .withMessage('Hasło jest wymagane. '),
  body('haslo2').custom((value, { req }) => {
    if (value !== req.body.haslo) {
      throw new Error('Hasła się różnią. ');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      const errorMessages = parseErrorsToArray(errors);
      res.render('rejestracja', { errors: errorMessages });
    }
    else {
      const added = await addUserToDatabase(req.body.imie, req.body.nazwisko, req.body.email, req.body.haslo);
      if (added) {
        req.session.email = req.body.email;
        res.render('rejestracja-sukces');
      }
      else {
        res.render('rejestracja', { errors: [ 'Email jest już w użyciu. ' ] });
      }
    }
  }
)

app.get('/login', (req, res) => {
  if (req.session.email === undefined) {
    res.render('login', { errors: [] });
  }
  else {
    res.redirect('/index?grupa=0');
  }
})

app.post('/login',
  body('email')
    .notEmpty()
    .withMessage('Email jest wymagany. ')
    .isEmail()
    .withMessage('Niepoprawny email. '),
  body('haslo')
    .notEmpty()
    .withMessage('Hasło jest wymagane. '),
  async (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      const errorMessages = parseErrorsToArray(errors);
      res.render('login', { errors: errorMessages });
    }
    else {
      const user = await getUser(req.body.email, req.body.haslo);
      if (user !== undefined) {
        req.session.email = user.email;
        res.render('user', { logged: true, reservations: await getReservationsOfUser(req.session.email) });
      }
      else {
        req.session.email = undefined;
        res.render('login', { errors: [ 'Niepoprawna para email-hasło. ' ] });
      }
    }
  }
)

app.get('/logout', (req, res) => {
  req.session.email = undefined;
  res.redirect('/index?grupa=0');
})

app.get('/user', async (req, res) => {
  if (req.session.email === undefined) {
    res.render('user', { logged: false });
  }
  else {
    res.render('user', { logged: true, reservations: await getReservationsOfUser(req.session.email) });
  }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})