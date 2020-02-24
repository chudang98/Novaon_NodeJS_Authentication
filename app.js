const express = require('express'),
  mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');

const handlerError = require('./controllers/errorController');
const userRoute = require('./routers/userRoutes');

const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser());

app.set('view engine', 'pug');

app.use(mongoSanitize());
// app.use(xss());

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use('/', userRoute);

app.use(handlerError);

module.exports = app;
