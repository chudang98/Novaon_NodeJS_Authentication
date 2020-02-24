/*
    Controller dùng đẻ xử lý tất cả các lỗi.
*/
const AppError = require('./../ultis/appError');

const loginErr = (err, res) => {
  return res.status(400).render('login', {
    error: true,
    message: err.message
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // let error = { ...err };

  if (err.nameErr == 'login_err') loginErr(err, res);
};
