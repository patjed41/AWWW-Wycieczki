const { database, Wycieczka, Zgloszenie, User } = await import('./database.mjs');
const { Op } = await import('sequelize');

import bcrypt from 'bcrypt';
const saltRounds = 10;

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

async function addReservationToDatabase(wycieczkaId, userId, name, surname, email, places) {
  try {
    const result = await database.transaction(async (t) => {
      const trips = await Wycieczka.findAll({
        where: {
          end_date: {
            [Op.gt]: "2022-01-02T00:00:00.000Z"
          },
          id: wycieczkaId
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
      console.log(userId);

      await Zgloszenie.create({
        name: name,
        surname: surname,
        email: email,
        places: places,
        WycieczkaId: wycieczkaId,
        UserId: userId
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

async function addUserToDatabase(name, surname, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await database.transaction(async (t) => {
      await User.create({
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword
      }, {
        transaction: t,
        lock: true
      });
    });

    return true;
  } catch (error) {
    return false;
  }
}

async function getUser(email, password) {
  try {
    const result = await database.transaction(async (t) => {
      const users = await User.findAll({
        where: {
          email: email
        },
        transaction: t,
        lock: true
      });

      if (users.length != 1 || (password !== null && !bcrypt.compareSync(password, users[0].password))) {
        return undefined;
      }
      return users[0];
    });

    return result;
  } catch (error) {
    return undefined;
  }
}

async function getReservationsOfUser(email) {
  try {
    const result = await database.transaction(async (t) => {
      const reservations = await Zgloszenie.findAll({
        where: {
          email: email
        },
        transaction: t,
        lock: true
      });

      let resWithTrips = [];
      for (const res of reservations) {
        const trips = await Wycieczka.findAll({
          where: {
            id: res.WycieczkaId
          },
          transaction: t,
        });
        console.log(trips[0].name);
        resWithTrips.push({ wycieczka: trips[0].name, places: res.places });
      }

      return resWithTrips;
    });

    return result;
  } catch (error) {
    return [];
  }
}

export { getAvailableTrips, getAvailableTrip, addReservationToDatabase, addUserToDatabase,
  getUser, getReservationsOfUser };