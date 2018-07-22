require('dotenv').config();

const knex = require('knex')({
  client     : process.env.DB_CLIENT,
  connection:{
    host: process.env.HOST,
    user: process.env.DB_USER,
    password : process.env.DB_PASS,
    database: process.env.DB_NAME
  },
});

module.exports = knex;