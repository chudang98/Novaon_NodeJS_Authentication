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

    if (statusUsername.status == false) {
      notifyUsername.innerHTML = statusUsername.message;
    }
    if (statusEmail.status == false) {
      notifyEmail.innerHTML = statusEmail.message;
      return;
    }
    if (statusPassword.status == false) {
      notifyPassword.innerHTML = statusPassword.message;
      return;
    }
    if (statusConfirmPass.status == false) {
      notifyUsername.innerHTML = statusConfirmPass.message;
      return;
    }
    signup(username, email, password);
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
    console.log(res.data);
    if (res.data.status === 'success') {
      location.assign('/');
    }
  } catch (err) {
    console.log(err);

    document.querySelector('#error_signup').innerHTML =
      err.response.data.message;
  }
};

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
      message:
        'Password bạn nhập vào không đúng định dạng! Cần có cả chữ thường, chữ hoa và số'
    };
  return {
    status: true,
    message: 'Right'
  };
}

function validateUsername(username) {
  let re = new RegExp(
    '^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$'
  );
  if (username == '' || username == null) {
    return {
      status: 'false',
      message: 'Username không được để rỗng.'
    };
  }
  if (!re.test(username))
    return {
      status: false,
      message:
        'Username sai định dạng ! Chỉ được chứa chữ cái, dấu cách, dấu chấm'
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
      message: 'Chưa nhập xác nhận mật khẩu !'
    };
  if (confirmpass.localeCompare(password) != 0) {
    return {
      status: false,
      message: 'Mật khẩu không đúng !'
    };
  }

  return {
    status: true,
    message: 'Right'
  };
}
