/* eslint-disable import/no-dynamic-require */
require('dotenv').config();

const env = process.env.NODE_ENV;
const configuration = require(`./${env}`);

module.exports = configuration.db;
