const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

let port = process.env.PORT,
  database = process.env.DATABASE,
  username = process.env.DATABASE_USERNAME,
  password = process.env.DATABASE_PASSWORD;
// let DB = database
//   .replace('<USERNAME>', username)
//   .replace('<PASSWORD>', password);
let DB = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    userNewUrlParser: true,
    userCreateIndex: true,
    userFindAndModify: false
  })
  .then(con => {
    console.log('Connection succes to server...');
  })
  .catch(err => {
    console.log(err);
  });

const app = require('./app');

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
