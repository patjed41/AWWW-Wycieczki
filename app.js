const express = require('express');
const app = express();
const port = 8080;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

const trip0 = {
  id: 0,
  name: 'Szczyt wszystkiego',
  description: 'Krótka wycieczka z wejściem na ten właśnie szczyt.',
  price: '15002900',
  picture: 'pictures/szczyt-wszystkiego.jpg'
}

const trip1 = {
  id: 1,
  name: 'Dalekie morza',
  description: 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji też może być więcej.',
  price: '17',
  picture: 'pictures/dalekie-morza.jpg'
}

const trip2 = {
  id: 2,
  name: 'Miasto',
  description: 'Na świecie mamy jeszcze miasta, można je zwiedzać.',
  price: '3405691582',
  picture: 'pictures/city.jpeg'
}

const trip3 = {
  id: 3,
  name: 'Pustynia',
  description: 'Niezapomniana przejażdżka wielbłądem po Saharze.',
  price: '1234',
  picture: 'pictures/pustynia.jpeg'
}

const trip4 = {
  id: 4,
  name: 'Rejs do okoła świata',
  description: 'Wodaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.',
  price: '891839',
  picture: 'pictures/rejs.jpeg'
}

const trip5 = {
  id: 5,
  name: 'Wyprawa na Biegun Południowy',
  description: 'Długa i mroźna przygoda po Antarktydzie.',
  price: '10101',
  picture: 'pictures/antarktyda.jpg'
}

const trip6 = {
  id: 6,
  name: 'Tratwą po Amazonii.',
  description: 'Owady, węże, krokodyle i ukrop nie do zniesienia.',
  price: '9182',
  picture: 'pictures/amazonia.jpeg'
}

const trip7 = {
  id: 6,
  name: 'Lot w kosmos.',
  description: 'Spędzenie niezapomnianej chwili na orbicie.',
  price: '999999',
  picture: 'pictures/orbita.webp'
}

const trips = [trip0, trip1, trip2, trip3, trip4, trip5, trip6, trip7];

const tripDescription0 = {
  id: 0,
  picture: trip0.picture,
  desc0: 'Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry.',
  name: trip0.name,
  desc1: 'Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry.',
  desc2: 'Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry.',
  additionalInfo: 'Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo.',
  time: 'zimą',
  temperature: 'zero absolutne',
  goodToTake: 'ciepłe ubranka',
  price: trip0.price,
  program: ['Wejście na szczyt.', 'Zejście ze szczytu.', 'Ogrzewanko przy piecyku.']
}

const tripDescription1 = {
  id: 1,
  picture: trip1.picture,
  desc0: 'Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze.',
  name: trip1.name,
  desc1: 'Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze.',
  desc2: 'Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze.',
  additionalInfo: 'Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie zimnooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo.',
  time: 'latem',
  temperature: 'wysoka',
  goodToTake: 'parawan',
  price: trip1.price,
  program: ['Plażing.', 'Leżing.', 'Relaksing.']
}

const tripDescription2 = {
  id: 2,
  picture: trip2.picture,
  desc0: 'Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta.',
  name: trip2.name,
  desc1: 'Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta.',
  desc2: 'Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta.',
  additionalInfo: 'Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo.',
  time: 'latem',
  temperature: 'średnia',
  goodToTake: 'aparat',
  price: trip2.price,
  program: ['Zwiedzenia tego.', 'Zwiedzanie tamtego.', 'Zwiedzanie tego i owego.', 'Kupowanie pamiątek.']
}

const tripDescription3 = {
  id: 3,
  picture: trip3.picture,
  desc0: 'Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni.',
  name: trip3.name,
  desc1: 'Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni.',
  desc2: 'Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni.',
  additionalInfo: 'Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo.',
  time: '21.07.2022',
  temperature: 'gorąco w dzień, zimno w nocy',
  goodToTake: 'wodę',
  price: trip3.price,
  program: ['Podziwianie piachu.', 'Podziwianie wydm.', 'Podziwianie piramid.']
}

const tripDescription4 = {
  id: 4,
  picture: trip4.picture,
  desc0: 'Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie.',
  name: trip4.name,
  desc1: 'Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie.',
  desc2: 'Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie.',
  additionalInfo: 'Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno.',
  time: '25.07-23.08 2022',
  temperature: 'w sam raz',
  goodToTake: 'aparat',
  price: trip4.price,
  program: ['Rejs 1.', 'Rejs 2.', 'Rejs 3.', 'Rejs 4.']
}

const tripDescription5 = {
  id: 5,
  picture: trip5.picture,
  desc0: 'Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu.',
  name: trip5.name,
  desc1: 'Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu.',
  desc2: 'Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu.',
  additionalInfo: 'Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno.',
  time: 'jesienią',
  temperature: 'dużo na minusie',
  goodToTake: 'tak dużo rzeczy, że nie warto pisać',
  price: trip5.price,
  program: ['Śnieg.', 'Śnieg.', 'Biegun.', 'Śnieg', 'Śnieg']
}

const tripDescription6 = {
  id: 6,
  picture: trip6.picture,
  desc0: 'Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą.',
  name: trip6.name,
  desc1: 'Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą.',
  desc2: 'Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą.',
  additionalInfo: 'Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie.',
  time: 'pojutrze',
  temperature: '32 stopnie',
  goodToTake: 'wiosła',
  price: trip6.price,
  program: ['Uciekanie przed krokodylami.', 'Uciekanie przed wężami.', 'Uciekanie przed wszystkim.']
}

const tripDescription7 = {
  id: 7,
  picture: trip7.picture,
  desc0: 'Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos.',
  name: trip7.name,
  desc1: 'Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos.',
  desc2: 'Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. ',
  additionalInfo: 'Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. ',
  time: 'w dalekiej przyszłości',
  temperature: 'kto wie jaka jest temperatura w kosmosie?',
  goodToTake: 'skafander',
  price: trip7.price,
  program: ['Wylot.', 'Lot.', 'Przylot']
}

const fullDescriptions = [tripDescription0, tripDescription1, tripDescription2, tripDescription3, tripDescription4, tripDescription5, tripDescription6, tripDescription7];

const groups = Math.max(Math.floor((trips.length + 2) / 3), 1);

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

function checkGroup(req, res) {
  if (req.query.grupa === undefined) {
    res.status(404).send('No trip group.');
  }

  const group = parseInt(req.query.grupa);
  if (group < 0 || group >= groups) {
    res.status(404).send('Wrong trip group.');
  }

  return group;
}

function checkTripId(req, res) {
  if (req.query.wycieczkaId === undefined) {
    res.status(404).send('No trip ID.');
  }

  const id = parseInt(req.query.wycieczkaId);
  if (id < 0 || id >= trips.length) {
    res.status(404).send('Wrong trip ID.');
  }

  return id;
}

app.get('/index', (req, res) => {
  const group = checkGroup(req, res);

  res.render('index', { trips: trips.slice(group * 3, group * 3 + 3), group: group, groups: groups });
})

app.get('/wycieczka', (req, res) => {
  const id = checkTripId(req, res);
  
  res.render('wycieczka', { trip: fullDescriptions[id] });
})


app.get('/form', (req, res) => {
  const id = checkTripId(req, res);

  res.render('form', { trip: trips[id] });
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