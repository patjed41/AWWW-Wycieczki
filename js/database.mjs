import { Sequelize, DataTypes } from 'sequelize';

// const database = new Sequelize('postgres://pj429285:iks@localhost:5432/bd');
var database = new Sequelize(
  "db",
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "0.0.0.0",
    dialect: "sqlite",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    storage: "db.sqlite"
  }
);

const Wycieczka = database.define('Wycieczka', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc0: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  desc1: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  desc2: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  additionalInfo: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  begin_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      endAfterBeginning(end) {
        if (end < this.begin_date) {
          throw new Error('Beginning after the end.');
        }
      }
    }
  },
  temperature: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  goodToTake: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  program1: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  program2: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  program3: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  places_left: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    }
  }
}, {
    tableName: 'Wycieczki'
});

const Zgloszenie = database.define('Zgloszenie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  places: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  }
}, {
  tableName: 'Zgloszenia'
});

const User = database.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

Wycieczka.hasMany(Zgloszenie);
Zgloszenie.belongsTo(Wycieczka);
User.hasMany(Zgloszenie);
Zgloszenie.belongsTo(User);

async function checkConnectionWithDatabase() {
  await database.authenticate().then(() => {
    console.log('Connecting to database...');
  }).catch(err => {
    throw "Connecting to database failed.";
  });
}

export { database, checkConnectionWithDatabase, Wycieczka, Zgloszenie, User };
