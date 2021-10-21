'use strict';

require('dotenv').config();

// Global START
global.ENV = process.env.NODE_ENV || `development`
global.Sequelize = require(`sequelize`)
// global._db = require(`${__dirname}/core/db`).getConnection()
global._controller = require(`${__dirname}/apps/controllers`)
global._lib = require(`${__dirname}/apps/libs`)
// global._router = require(`${__dirname}/apps/routes`)
// global._model = require(`${__dirname}/database/models`)
global.moment = require(`moment`)
global._config = require(`${__dirname}/apps/config`)

//Requires START
const express = require('express');
const response = require('./core/response.js')
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan')
const http = require('http');
const path = require('path');
const router = require(`${__dirname}/apps/routes`)()
const routerPrivateUser = require(`${__dirname}/apps/routes/privateUser`)()
const globalAuth = _lib('globalAuth')

//Init app start
const app = express();
const server = http.createServer(app);

app.set('x-powered-by', false);
// app.set('trust proxy', true);

app.use(cors())
app.use(response)
app.use(bodyParser.json({
  'strict': false,
  limit: '50mb'
}))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb',
  parameterLimit: 1000000
}))
app.all('/privateUser/*', (req, res, next) => globalAuth(req, res, next))
app.use(express.static(path.join(__dirname, '../stripe_frontend_/build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../stripe_frontend_/build', 'index.html'));
});
app.use(router)
app.use(routerPrivateUser)

const corsOptions = {
  origin: "http://localhost:3000"
}
app.use(cors(corsOptions));
server.listen(process.env.PORT || 7878, '0.0.0.0', function () {
  console.log("SERVER BERJALAN DI PORT " + process.env.PORT)
})

module.exports = app