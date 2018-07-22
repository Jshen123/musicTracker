//imports
import express from 'express';
import cookieSession from 'cookie-session';
// import util from '../lib/utils/helpers.js';
const routes = express.Router();

//Cookie Session Setup
routes.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

//==================== Routes
module.exports = function(DataHelpers) {

  //========== GET Routes


  return routes;
};