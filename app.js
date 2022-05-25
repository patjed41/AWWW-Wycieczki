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

import { database, checkConnectionWithDatabase, Wycieczka, Zgloszenie } from './js/database.mjs';
import { Op } from 'sequelize';

await checkConnectionWithDatabase();

async function getAvailableTrips() {
  const trips = await Wycieczka.findAll({
    where: {
      end_date: {
        [Op.gt]: "2022-01-02T00:00:00.000Z"
      }
    },
    order: ['begin_date']
  });

  return trips;
}

async function getAvailableTrip(id) {
  const trips = await Wycieczka.findAll({
    where: {
      end_date: {
        [Op.gt]: "2022-01-02T00:00:00.000Z"
      },
      id: id
    }
  });

  if (trips.length == 0) {
    return null;
  }

  return trips[0];
}

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

function checkGroup(req, res, groups) {
  if (req.query.grupa === undefined) {
    res.status(404).send('No trip group.');
  }

  const group = parseInt(req.query.grupa);
  if (group < 0 || group >= groups) {
    res.status(404).send('Wrong trip group.');
  }

  return group;
}

app.get('/index', async (req, res) => {
  const available_trips = await getAvailableTrips();
  const groups = Math.max(Math.floor((available_trips.length + 2) / 3), 1);
  const group = checkGroup(req, res, groups);
  const trips_to_render = available_trips.slice(group * 3, group * 3 + 3);
  res.render('index', { trips: trips_to_render, group: group, groups: groups });
})

function checkTripId(req, res) {
  if (req.query.wycieczkaId === undefined) {
    res.status(404).send('No trip ID.');
  }

  const id = parseInt(req.query.wycieczkaId);
  if (id <= 0) {
    res.status(404).send('Wrong trip ID.');
  }

  return id;
}

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

  res.render('form', { trip: trip, errors: [] });
})

async function addApplicationToDatabase(id, name, surname, email, places) {
  try {
    const result = await database.transaction(async (t) => {
      const trips = await Wycieczka.findAll({
        where: {
          end_date: {
            [Op.gt]: "2022-01-02T00:00:00.000Z"
          },
          id: id
        },
        transaction: t,
        lock: true
      });
      if (trips.length == 0 || trips[0].places_left < places) {
        return false;
      }

      await trips[0].decrement('places_left', {
        by: places,
        transaction: t,
        lock: true
      });
  
      await Zgloszenie.create({
        name: name,
        surname: surname,
        email: email,
        places: places,
        WycieczkaId: id
      }, {
        transaction: t,
        lock: true
      });

      return true;
    });

    return result;
  } catch (error) {
    return false;
  }
}

app.post('/form',
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
      let errorMessages = [];
      let lastWrongParam = '';
      for (const error of errors.sort()) {
        if (error.param.localeCompare(lastWrongParam) != 0) {
          errorMessages.push(error.msg);
          lastWrongParam = error.param;
        }
      }
      res.render('form', { trip: trip, errors: errorMessages });
    }

    const added = await addApplicationToDatabase(id, req.body.imie, req.body.nazwisko, req.body.email, req.body.zgloszenia);
    if (added) {
      res.render('form-sukces', { trip: trip , places: req.body.zgloszenia });
    }
    else {
      res.render('form', { trip: trip, errors: [ 'Application failed.' ] });
    }
  }
)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})