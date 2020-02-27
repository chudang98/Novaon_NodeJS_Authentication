const express = require('express'),
  path = require('path'),
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

app.use(bodyParser());
app.use(cookieParser());
app.use(cors());

app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

app.use(mongoSanitize());

// Serving static files
app.use(express.static(`${__dirname}/public`));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', viewRoutes);
app.use('/api', apiRoutes);

app.use(handlerError);

module.exports = app;
