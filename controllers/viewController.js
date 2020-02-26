const checkLogin = res => {
  if (res.locals.user) return res.redirect('/');
};
exports.homeView = (req, res) => {
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
    console.log('Have cookie JWT');
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
