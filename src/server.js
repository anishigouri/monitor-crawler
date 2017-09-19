/* eslint no-console: "off" */

import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import http from 'http';
import socketIO from 'socket.io';
import pg from 'pg';

const app = new Express();

const server = http.createServer(app);

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }

  return res.status(status).render('index', { markup });
});

let io = socketIO(server);

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/caddev';

io.on('connection', (socket) => {
  console.log('someone connected');

  setInterval(() => {

    const client = new pg.Client({
      user: 'postgres',
      host: 'localhost',
      database: 'caddev',
      password: 'postgres',
      port: 5432,
    });

    client.connect();

    client.query('SELECT * FROM crawler_requisicao order by status', (err, res) => {
        socket.emit('requisicoes', res.rows);
        client.end();
    });

     
  }, 2000);
  
});

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
