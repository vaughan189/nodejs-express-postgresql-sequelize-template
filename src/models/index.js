/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
require('dotenv').config();

const env = process.env.NODE_ENV;

const config = require(`${__dirname}/../config/${env}`);
const db = {};

let sequelize;
if (config.db.use_env_variable) {
  sequelize = new Sequelize(process.env[config.db.use_env_variable], config.db);
} else {
  sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    config.db
  );
}

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
