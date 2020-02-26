const checkUser = res => {
  if (res.locals.user) return true;
  return false;
};
exports.homeView = (req, res) => {
  res.status(200).render('home', {
    status: 'success'
  });
};

exports.loginView = (req, res) => {
  res.status(200).render('login', {
    status: 'success'
  });
};

exports.logoutAcc = (req, res) => {
  if (req.cookies.jwt) {
    console.log('Have cookie JWT');
    res.clearCookie('jwt');
  }
  res.redirect('/');
};

exports.signupView = (req, res) => {
  res.status(200).render('signup', {
    status: 'success'
  });
};
