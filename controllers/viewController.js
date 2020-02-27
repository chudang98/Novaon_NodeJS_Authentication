const Tour = require('./../models/tourModel');

const checkLogin = res => {
  if (res.locals.user) return res.redirect('/');
};

exports.homeView = async (req, res) => {
  if (res.locals.user) {
    const tours = await Tour.find({});
    res.locals.tours = tours;
  }
  res.status(200).render('home', {
    status: 'success'
  });
};

exports.loginView = (req, res) => {
  checkLogin(res);
  res.status(200).render('login', {
    status: 'success'
  });
};

exports.logoutAcc = (req, res) => {
  // checkLogin(res);
  if (req.cookies.jwt) {
    res.clearCookie('jwt');
  }
  res.redirect('/');
};

exports.signupView = (req, res) => {
  checkLogin(res);
  res.status(200).render('signup', {
    status: 'success'
  });
};
exports.tourView = async (req, res) => {
  if (res.locals.user) {
    let id = req.params.tour_id;
    try {
      const tour = await Tour.findOne({ _id: id });
      res.locals.tour = tour;
      res.locals.tourIMG = tour.imageCover.replace('-cover.jpg', '-');
      return res.status(200).render('tour', {
        status: 'success'
      });
    } catch (err) {
      return res.redirect('/');
    }
  } else return res.redirect('/login');
};
