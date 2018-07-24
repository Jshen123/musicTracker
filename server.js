"use strict";

require('dotenv').config();

import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import {StaticRouter} from 'react-router-dom'
import App from './src/client/App';

// middle-ware
import bodyParser from "body-parser";
import cookieSess from 'cookie-session';

import knexConfig from "./knexfile";
import db from "./lib/db.js";

//debug and dev tools
import logger from 'winston'
import morgan from 'morgan';
import knexLogger from 'knex-logger';

const ENV = process.env.ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

// Seperated Routes for each Resource
const queries = require("./lib/queries.js")(db);
const Routes = require("./routes/routes")(queries);

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Material-UI</title>
      </head>
      <body>
        <script async src="/build/bundle.js"></script>
        <div id="root">${html}</div>
        <style id="jss-server-side">${css}</style>
      </body>
    </html>
  `;
}

function handleRender(req, res) {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#a4a4a4',
        main: '#757575',
        dark: '#494949',
        contrastText: '#ffffff',
      },
      secondary: {
        light: '#263238',
        main: '#a4a4a4',
        dark: '#494949',
        contrastText: '#ffffff',
      },
      background: {
        paper: '#E1E2E1',
        default: '#E1E2E1',
      },
    },
  });

  const generateClassName = createGenerateClassName();

  const context = {}
  // Render the component to a string.
  const html = renderToString(
    <StaticRouter location={req.url}context={context}>
      <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <App />
        </MuiThemeProvider>
      </JssProvider>
    </StaticRouter>,
  );

  // Grab the CSS from our sheetsRegistry.
  const css = sheetsRegistry.toString();

  // Send the rendered page back to the client.
  res.send(renderFullPage(html, css));
}


// app
const app = express();

app.use('/build', express.static('build'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount all resource routes
app.use("/", Routes);

// This is fired every time the server side receives a request.
app.use(handleRender);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

const port = 3000;
app.listen(port);
