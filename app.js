const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

const trip0 = {
  name: 'Szczyt wszystkiego',
  description: 'Krótka wycieczka z wejściem na ten właśnie szczyt.',
  price: '15002900',
  picture: 'pictures/szczyt-wszystkiego.jpg'
}

const trip1 = {
  name: 'Dalekie morza',
  description: 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji też może być więcej.',
  price: '17',
  picture: 'pictures/dalekie-morza.jpg'
}

const trip2 = {
  name: 'Miasto',
  description: 'Na świecie mamy jeszcze miasta, można je zwiedzać.',
  price: '3405691582',
  picture: 'pictures/city.jpeg'
}

const trips = [trip0, trip1, trip2];

const tripDescription0 = {
  picture: trip0.picture,
  desc0: 'Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry.',
  name: trip0.name,
  desc1: 'Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry.',
  desc2: 'Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. ',
  additionalInfo: 'Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo.',
  time: 'zimą',
  temperature: 'zero absolutne',
  goodToTake: 'ciepłe ubranka',
  price: trip0.price,
  program: ['Wejście na szczyt.', 'Zejście ze szczytu.', 'Ogrzewanko przy piecyku.']
}

const fullDescriptions = [tripDescription0,];

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

app.get('/index', (req, res) => {
  res.render('index', { trips: trips });
})

app.get('/wycieczka', (req, res) => {
  if (req.query.wycieczkaId === undefined) {
    res.status(404).send('No trip ID.');
  }

  const id = parseInt(req.query.wycieczkaId);
  if (id < 0 || id > 2) {
    res.status(404).send('Wrong trip ID.');
  }
  
  res.render('wycieczka', { trip: fullDescriptions[id] });
})


app.get('/form', (req, res) => {
  res.render('form');
})

app.get('/layout', (req, res) => {
  res.render('layout');
})

/*app.get('/wycieczka/:wycieczkaNr/tydzien/:wycieczkaTydzien', (req, res) => {
  res.send(`wycieczka nr ${req.params['wycieczkaNr']} w tygodniu ${req.params['wycieczkaTydzien']}`);
})

app.get('/wycieczka-q', (req, res) => {
  res.send(`wycieczka nr ${req.query.nr} w tygodniu ${req.query.tydzien}`);
})*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})