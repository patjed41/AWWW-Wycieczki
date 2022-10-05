# Wycieczki

My solution for the project of the [WWW aplications (pol. Aplikacje WWW)](https://usosweb.mimuw.edu.pl/kontroler.php?_action=katalog2/przedmioty/pokazPrzedmiot&prz_kod=1000-214bWWW) course taken in the 2021/2022 summer semester.

## About the project

The project is a website that allows users to book tickets for the trips. It is a set of many laboratory tasks (around 5-10 per week) and because of that the code is not the cleanest and a little messy. It was just impossible to plan a project structure well without knowing what tasks will appear next week. Additionally, we were working with new technologies all the time and this increased difficulty even more. So please be lenient with the code.

There were so many small tasks that listing them here is not worth it. It's much better to just run the website and check the final product.

### Technologies

The project is written in `Node.js`. These moduls and libraries are used:
- `Express`
- `Pug`
- `Sequelize`
- `body-parser`
- `Bcrypt`

We were using `Sequelize` with univeristy `Postgres` database but i changed it to `SQLite` so it can be easily run locally.

### Usage

To run project locally:

1. Clone the repository.

2. Go to `AWWW-Wycieczki` directory.

3. Execute
```
npm install
```
to install necessary libraries.

4. Execute
```
npm run db-init
```
to initiate the database. You can run this command every time you want to go back to fresh state of the database.

5. Execute
```
npm start
```
to run the server.

6. Go to
```
http://localhost:8080/index?grupa=0
```
in your browser.

7. Explore.
