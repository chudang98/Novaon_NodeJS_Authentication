const express = require('express');

const viewController = require('./../controllers/viewController');
const auth = require('./../controllers/authController');

const router = express.Router();

router.use(auth.isLogin);

router.get('/', viewController.homeView);
router.get('/login', viewController.loginView);
router.get('/aaaaa', viewController.logoutAcc);
router.get('/signup', viewController.signupView);

module.exports = router;
