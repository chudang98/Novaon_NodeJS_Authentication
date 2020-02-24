const express = require('express');

const authentication = require('./../controllers/authController');
const catchAsyncFn = require('./../ultis/catchAsync');

const router = express.Router();

router.route('/').get((req, res) => {
  res.status(200).render('home', {
    title: 'Home page'
  });
});

router
  .route('/login')
  .get(authentication.getLogin)
  .post(authentication.login);

router.route('/signup').post(authentication.signup);
module.exports = router;
