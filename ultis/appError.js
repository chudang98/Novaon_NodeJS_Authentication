class AppError extends Error {
  constructor(mess, codeError, nameError = null) {
    super(mess);
    this.statusCode = codeError;
    this.status = `${codeError}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.nameErr = nameError;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
