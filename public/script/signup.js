/* eslint-disable */
// import axios from 'axios';

document.addEventListener('DOMContentLoaded', event => {
  let submit = document.querySelector('#submit_login');
  submit.addEventListener('click', () => {
    let email = document.querySelector('#email').value,
      password = document.querySelector('#password').value,
      username = document.querySelector('#username').value,
      confirmpass = document.querySelector('#confirmpass').value;

    let statusEmail = validateEmail(email),
      statusPassword = validatePassword(password),
      statusUsername = validateUsername(username),
      statusConfirmPass = validateConfirmPassword(password, confirmpass);

    let notifyEmail = document.querySelector('#emailError'),
      notifyPassword = document.querySelector('#passwordError'),
      notifyConfirmPassword = document.querySelector('#confirmpassError'),
      notifyUsername = document.querySelector('#usernameError');

    notifyEmail.innerHTML = '';
    notifyPassword.innerHTML = '';
    notifyConfirmPassword.innerHTML = '';
    notifyUsername.innerHTML = '';

    let check = true;

    if (statusUsername.status == false) {
      notifyUsername.innerHTML = statusUsername.message;
      check = false;
    }
    if (statusEmail.status == false) {
      notifyEmail.innerHTML = statusEmail.message;
      check = false;
    }
    if (statusPassword.status == false) {
      notifyPassword.innerHTML = statusPassword.message;
      check = false;
    }
    if (statusConfirmPass.status == false) {
      notifyConfirmPassword.innerHTML = statusConfirmPass.message;
      check = false;
    }

    if (check == true) signup(username, email, password);
  });
});

const signup = async (username, email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/signup',
      data: {
        username,
        email,
        password
      }
    });
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    document.querySelector('#error_signup').innerHTML =
      err.response.data.message;
  }
};

function validateEmail(email) {
  if (email == null || email == '')
    return {
      status: false,
      message: 'Email is empty'
    };
  var re = RegExp('^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$');
  if (!re.test(email))
    return {
      status: false,
      message: 'Invalid email address'
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
      message:
        'Password is not valid. Password minimum 8 characters, at least one uppercase letter (A - Z), one lowercase letter (a - z) and one number (0 - 9)'
    };
  return {
    status: true,
    message: 'Right'
  };
}

function validateUsername(username) {
  let re = new RegExp(
    '^(?=.{8,20}$)(?![ .])(?!.*[ .]{2})[a-zA-Z0-9. ]+(?<![ .])$'
  );
  if (username == '' || username == null) {
    return {
      status: false,
      message: 'Username is empty'
    };
  }
  if (!re.test(username))
    return {
      status: false,
      message: 'Username is not valid.'
    };
  return {
    status: true,
    message: 'Right'
  };
}

function validateConfirmPassword(password, confirmpass) {
  if (confirmpass == null || confirmpass == '')
    return {
      status: false,
      message: 'Confirm password is empty'
    };
  if (confirmpass.localeCompare(password) != 0) {
    return {
      status: false,
      message: 'Confirm password wrong'
    };
  }

  return {
    status: true,
    message: 'Right'
  };
}
