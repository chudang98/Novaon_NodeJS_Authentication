/*
    Controller dùng đẻ xử lý tất cả các lỗi.
*/
const AppError = require('./../ultis/appError');

const resErr = (err, res) => {
  return res.status(err.statusCode).json({
    status: 'fail',
    error: true,
    message: err.message
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // let error = { ...err };

  if (err.nameErr == 'login_err') resErr(err, res);
  if (err.nameErr == 'signup_err') resErr(err, res);
};
