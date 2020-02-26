const express = require('express');

const authentication = require('../controllers/authController');

const router = express.Router();

router.route('/login').post(authentication.login);
router.route('/signup').post(authentication.signup);

router
  .route('/dashboard')
  .get(authentication.requiredLogin, authentication.getDashboard);
module.exports = router;
