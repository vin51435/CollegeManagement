//* JavaScript file for Login page(Login.html)

//* javascript for Login2.html------>
const stuNavBtn = document.querySelector('.stuLgNav');
const teaNavBtn = document.querySelector('.teaLgNav');
const teaLgMainDiv = document.querySelector('.teacherLoginMainDiv');
const stdLgMainDiv = document.querySelector('.studentLoginMainDiv');
const navLink = document.querySelector('.nav-link');

if (stuNavBtn) {
  stuNavBtn.addEventListener('click', function () {
    stdLgMainDiv.classList.remove('d-none');
    teaLgMainDiv.classList.add('d-none');
    stuNavBtn.classList.toggle('active');
    teaNavBtn.classList.toggle('active');
  });
}
if (teaNavBtn) {
  teaNavBtn.addEventListener('click', function () {
    teaLgMainDiv.classList.remove('d-none');
    stdLgMainDiv.classList.add('d-none');
    stuNavBtn.classList.toggle('active');
    teaNavBtn.classList.toggle('active');
  });
}

const teaLgEmail = document.querySelector('#teacherLoginEmail');
const teaLgPass = document.querySelector('#teacherPassword');
const teaLgSub = document.querySelector('.teacherLoginSubmit');

// const stuLgEmail = document.querySelector('#username');
// const stuLgPass = document.querySelector('#password');
// const stuLgSub = document.querySelector('#stuSubmitBtn');
// // const stuDetails = require('../../models/studentTemp');

// let value;
// stuLgSub.addEventListener('click', () => {
//   email = stuLgEmail.value;
//   password = stuLgPass.value;
//   console.log('\n');
//   console.log(email);
//   console.log(password);

//   login(stuLgEmail.value, stuLgPass.value)
//     .then((msg) => {
//       console.log('LOGGED IN!');
//       console.log(msg);
//       // alert(msg);
//       setInterval(() => window.open('/teacherdash/home', '_self'), 0);
//     })
//     .catch((err) => {
//       console.log('ERROR!');
//       console.log(err);
//       alert(err);
//     });
// });

// const login = async (username, password) => {
//   const { firstName, lastName } = await stuDetails.findById({});
//   if (!username || !password) throw 'Missing Credentials';
//   if (password === lastName && username === firstName) return 'WELCOME!';
//   throw 'Invalid Username or Password';
// };
