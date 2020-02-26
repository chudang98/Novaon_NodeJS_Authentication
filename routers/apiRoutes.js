const express = require('express');

const authentication = require('../controllers/authController');

const router = express.Router();

// router.use(authentication.isLogin);

router.route('/login').post(authentication.login);
router.route('/signup').post(authentication.signup);

module.exports = router;
