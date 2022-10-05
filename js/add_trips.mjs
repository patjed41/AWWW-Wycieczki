const { database, checkConnectionWithDatabase, Wycieczka, Zgloszenie, User } = await import('./database.mjs');
const { Op } = await import('sequelize');

await checkConnectionWithDatabase();

await Zgloszenie.destroy({
  truncate: true
}).catch(err => {
  console.log('Tabela Zgloszenia nie istnieje.');
});

await Wycieczka.destroy({
  truncate: true
}).catch(err => {
  console.log('Tabela Wycieczki nie istnieje.');
});

await User.destroy({
  truncate: true
}).catch(err => {
  console.log('Tabela Users nie istnieje.');
});

await database.sync({ force: true });

const wycieczka0 = await Wycieczka.create({
  name: 'Szczyt wszystkiego',
  description: 'Krótka wycieczka z wejściem na ten właśnie szczyt.',
  price: 15002900,
  picture: 'szczyt-wszystkiego.jpg',
  desc0: 'Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry. Fajna wycieczka w góry.',
  desc1: 'Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry. Bardzo fajna wycieczka w góry.',
  desc2: 'Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry. Najfajniejsza wycieczka w góry.',
  additionalInfo: 'Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo. Będzie zimnooooo.',
  begin_date: new Date(Date.UTC(2023, 0, 1)),
  end_date: new Date(Date.UTC(2023, 0, 2)),
  temperature: 'zero absolutne',
  goodToTake: 'ciepłe ubranka',
  program1: 'Wejście na szczyt.',
  program2: 'Zejście ze szczytu.',
  program3: 'Ogrzewanko przy piecyku.',
  places_left: 100
});

const wycieczka1 = await Wycieczka.create({
  name: 'Dalekie morza',
  description: 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji też może być więcej.',
  price: 17,
  picture: 'dalekie-morza.jpg',
  desc0: 'Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze. Fajna wycieczka nad morze.',
  desc1: 'Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze. Bardzo fajna wycieczka nad morze.',
  desc2: 'Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze. Najfajniejsza wycieczka nad morze.',
  additionalInfo: 'Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie zimnooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo. Będzie ciepłooooo.',
  begin_date: new Date(Date.UTC(2023, 6, 1)),
  end_date: new Date(Date.UTC(2023, 6, 20)),
  temperature: 'wysoka',
  goodToTake: 'parawan',
  program1: 'Plażing.',
  program2: 'Leżing.',
  program3: 'Relaksing.',
  places_left: 50
});

const wycieczka2 = await Wycieczka.create({
  name: 'Miasto',
  description: 'Na świecie mamy jeszcze miasta, można je zwiedzać.',
  price: 3405691582,
  picture: 'city.jpeg',
  desc0: 'Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta. Fajna wycieczka do miasta.',
  desc1: 'Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta. Bardzo fajna wycieczka do miasta.',
  desc2: 'Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta. Najfajniejsza wycieczka do miasta.',
  additionalInfo: 'Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo. Będzie głośnoooo.',
  begin_date: new Date(Date.UTC(2022, 8, 1)),
  end_date: new Date(Date.UTC(2022, 8, 15)),
  temperature: 'średnia',
  goodToTake: 'aparat',
  program1: 'Zwiedzenia tego.',
  program2: 'Zwiedzanie tamtego.',
  program3: 'Zwiedzanie tego i owego.',
  places_left: 35
});

const wycieczka3 = await Wycieczka.create({
  name: 'Pustynia',
  description: 'Niezapomniana przejażdżka wielbłądem po Saharze.',
  price: 1234,
  picture: 'pustynia.jpeg',
  desc0: 'Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni. Fajna wycieczka po pustyni.',
  desc1: 'Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni. Bardzo fajna wycieczka po pustyni.',
  desc2: 'Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni. Najfajniejsza wycieczka po pustyni.',
  additionalInfo: 'Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo. Będzie gorącooooo.',
  begin_date: new Date(Date.UTC(2024, 6, 4)),
  end_date: new Date(Date.UTC(2024, 6, 17)),
  temperature: 'gorąco w dzień, zimno w nocy',
  goodToTake: 'wodę',
  program1: 'Podziwianie piachu.',
  program2: 'Podziwianie wydm.',
  program3: 'Podziwianie piramid.',
  places_left: 70
});

const wycieczka4 = await Wycieczka.create({
  name: 'Rejs do okoła świata',
  description: 'Wodaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.',
  price: 891839,
  picture: 'rejs.jpeg',
  desc0: 'Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie. Fajny rejs po oceanie.',
  desc1: 'Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie. Bardzo fajny rejs po oceanie.',
  desc2: 'Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie. Najfajniejszy rejs po oceanie.',
  additionalInfo: 'Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno.',
  begin_date: new Date(Date.UTC(2023, 2, 4)),
  end_date: new Date(Date.UTC(2023, 3, 12)),
  temperature: 'w sam raz',
  goodToTake: 'aparat',
  program1: 'Rejs 1.',
  program2: 'Rejs 2.',
  program3: 'Rejs 3.',
  places_left: 10
});

const wycieczka5 = await Wycieczka.create({
  name: 'Wyprawa na Biegun Południowy',
  description: 'Długa i mroźna przygoda po Antarktydzie.',
  price: 10101,
  picture: 'antarktyda.jpg',
  desc0: 'Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu. Fajny marsz po śniegu.',
  desc1: 'Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu. Bardzo fajny marsz po śniegu.',
  desc2: 'Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu. Najfajniejszy marsz po śniegu.',
  additionalInfo: 'Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno. Będzie wilgotno.',
  begin_date: new Date(Date.UTC(2023, 11, 5)),
  end_date: new Date(Date.UTC(2023, 12, 20)),
  temperature: 'dużo na minusie',
  goodToTake: 'tak dużo rzeczy, że nie warto pisać',
  program1: 'Śnieg.',
  program2: 'Śnieg.',
  program3: 'Biegun.',
  places_left: 25
});

const wycieczka6 = await Wycieczka.create({
  name: 'Tratwą po Amazonii',
  description: 'Owady, węże, krokodyle i ukrop nie do zniesienia.',
  price: 9182,
  picture: 'amazonia.jpeg',
  desc0: 'Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą. Fajne płynięcie tratwą.',
  desc1: 'Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą. Bardzo fajne płynięcie tratwą.',
  desc2: 'Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą. Najfajniejsze płynięcie tratwą.',
  additionalInfo: 'Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie. Będzie niebezpiecznie.',
  begin_date: new Date(Date.UTC(2022, 8, 13)),
  end_date: new Date(Date.UTC(2022, 8, 21)),
  temperature: '32 stopnie',
  goodToTake: 'wiosła',
  program1: 'Uciekanie przed krokodylami.',
  program2: 'Uciekanie przed wężami.',
  program3: 'Uciekanie przed wszystkim.',
  places_left: 8
});

const wycieczka7 = await Wycieczka.create({
  name: 'Lot w kosmos',
  description: 'Spędzenie niezapomnianej chwili na orbicie.',
  price: 999999,
  picture: 'orbita.webp',
  desc0: 'Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos. Fajny lot w kosmos.',
  desc1: 'Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos. Bardzo fajny lot w kosmos.',
  desc2: 'Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. Najfajniejszy lot w kosmos. ',
  additionalInfo: 'Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. Będzie kosmicznie. ',
  begin_date: new Date(Date.UTC(2022, 9, 5)),
  end_date: new Date(Date.UTC(2022, 9, 6)),
  temperature: 'kto wie jaka jest temperatura w kosmosie?',
  goodToTake: 'skafander',
  program1: 'Wylot.',
  program2: 'Lot.',
  program3: 'Przylot.',
  places_left: 8
});
