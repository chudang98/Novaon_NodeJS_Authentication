/*
    Tính năng chính của authController :
        -  Tạo API login.
            Nếu user đã login thì tự động chuyển đến trang home
        -  Tạo API signup.
            Nếu user đã login thì tự động chuyển đến trang home
        -  Tạo API signout.
*/
const cryp = require('crypto');
const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const User = require('./../models/userModel');
const catchAsyncFn = require('./../ultis/catchAsync');
const AppError = require('./../ultis/appError');

// IN_PROCESSING...: API FOR LOGIN AND REGIST ACCOUNT

// TODO: LOGIN
const createToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Sử dụng hàm này trước khi res.status để trả về cookie cho user
const sendTokenCookie = (user, res) => {
  let token = createToken(user._id),
    cookieOption = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPORES_IN * 86400000000
      ),
      secure: false,
      httpOnly: true /* Cookie can not be access and modified in any way in browser  */
    };
  res.cookie('jwt', token, cookieOption);
};

const acceptLogin = (user, res) => {
  sendTokenCookie(user, res);
  res.status(200).json({
    status: 'success',
    message: 'Login thành công'
  });
};

exports.login = catchAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Email hoặc mật khẩu rỗng !', 401, 'login_err'));
  }

  // 2.Check account tồn tại và đúng password
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(
      new AppError('Email hoặc mật khẩu không đúng !', 401, 'login_err')
    );
  }
  acceptLogin(user, res);
});

// TODO: REGIST ACCOUNT
acceptSignup = (user, next, res) => {
  res.locals.user = user;
  return res.status(200).json({
    status: 'success',
    user,
    message: 'Đăng ký thành công !'
  });
};

exports.isLogin = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const user = await User.findById(decoded.id);

      if (!user) return next();

      if (user.changedPasswordAfter(decoded.iat)) return next();

      res.locals.user = user;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.signup = catchAsyncFn(async (req, res, next) => {
  console.log(req.body);
  let user = await User.create({
    userName: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  if (!user) console.log('User đã tồn tại');
  else console.log(user);
  acceptSignup(user, next, res);
});
