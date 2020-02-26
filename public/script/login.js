/* eslint-disable */
// import axios from 'axios';

document.addEventListener('DOMContentLoaded', event => {
  let submit = document.querySelector('#submit_login');
  submit.addEventListener('click', () => {
    let email = document.querySelector('#email').value,
      password = document.querySelector('#password').value;
    let statusEmail = validateEmail(email),
      statusPassword = validatePassword(password);
    let notifyEmail = document.querySelector('#emailError'),
      notifyPassword = document.querySelector('#passwordError');

    let check = true;

    notifyEmail.innerHTML = '';
    notifyPassword.innerHTML = '';
    if (statusEmail.status == false) {
      notifyEmail.innerHTML = statusEmail.message;
      check = false;
    }
    if (statusPassword.status == false) {
      notifyPassword.innerHTML = statusPassword.message;
      check = false;
    }
    if (check == true) login(email, password);
  });
});

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/login',
      data: {
        email,
        password
      }
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);

    document.querySelector('#error_login').innerHTML =
      err.response.data.message;
  }
};
function validateEmail(email) {
  if (email == null || email == '')
    return {
      status: false,
      message: 'Email is empty.'
    };
  var re = RegExp('^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$');
  if (!re.test(email))
    return {
      status: false,
      message: 'Invalid email address.'
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
      message: 'Password is empty.'
    };
  var t = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$';
  var re = new RegExp(t);
  if (!re.test(password))
    return {
      status: false,
      message: 'Password is not valid.'
    };
  return {
    status: true,
    message: 'Right'
  };
}
