/* eslint-disable */

document.addEventListener('DOMContentLoaded', event => {
  let submit = document.querySelector('#submit_login');
  submit.addEventListener('click', () => {
    let email = document.querySelector('#email').value,
      password = document.querySelector('#password').value;
    let statusEmail = validateEmail(email),
      statusPassword = validatePassword(password);
    let notifyEmail = document.querySelector('#emailError'),
      notifyPassword = document.querySelector('#passwordError');

    notifyEmail.innerHTML = '';
    notifyPassword.innerHTML = '';

    if (statusEmail.status == false) {
      notifyEmail.innerHTML = statusEmail.message;
      return;
    }
    if (statusPassword.status == false) {
      notifyPassword.innerHTML = statusPassword.message;
      return;
    }
    let form = document.querySelector('#form-login');
    form.submit();
  });
});

function validateEmail(email) {
  if (email == null || email == '')
    return {
      status: false,
      message: 'Email trống !'
    };
  var re = RegExp('^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$');
  if (!re.test(email))
    return {
      status: false,
      message: 'Email bạn nhập vào không đúng !'
    };
  return {
    status: true,
    message: 'Right'
  };
}

function validatePassword(password) {
  if (password == null || password == '')
    return {
      status: false,
      message: 'Password trống !'
    };
  var t = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
  var re = new RegExp(t);
  if (!re.test(password))
    return {
      status: false,
      message: 'Password bạn nhập vào không đúng !'
    };
  return {
    status: true,
    message: 'Right'
  };
}
