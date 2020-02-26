const express = require('express'),
  mongoSanitize = require('express-mongo-sanitize'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cors = require('cors');
// const xss = require('xss-clean');

const handlerError = require('./controllers/errorController');
const apiRoutes = require('./routers/apiRoutes');
const viewRoutes = require('./routers/viewRoutes');

const app = express();

app.use(express.json());

app.set('view engine', 'pug');

app.use(bodyParser());
app.use(cookieParser());
app.use(cors());

app.use(mongoSanitize());

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use('/', viewRoutes);
app.use('/api', apiRoutes);

app.use(handlerError);

module.exports = app;
