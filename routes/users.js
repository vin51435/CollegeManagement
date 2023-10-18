const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');

const User = require('../models/user');
const stuDetails = require('../models/studentTemp');

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post(
  '/register',
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password, role } = req.body;
      console.log(req.body);
      const user = new User({ email, username, role });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        console.log(req.body);
        if (user.role === 'Teacher') {
          console.log(user.role);
          req.flash('success', 'Welcome Teacher');
          res.redirect('/teacherdash/students');
        } else if (user.role === 'Student') {
          console.log(user.role);
          req.flash('success', 'Welcome Student');
          res.redirect('/studentdash/home');
        }
      });
    } catch (e) {
      req.flash('error', e.message);
      res.redirect('register');
    }
  })
);

router.get('/teacherdash/student/:id/sturegister', async (req, res) => {
  const { id } = req.params;
  const student = await stuDetails.findById(id);
  res.render('teadash/stuRegister', { student });
});

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  (req, res) => {
    if (req.user.role === 'Teacher') {
      console.log(req.user.role);
      req.flash('success', 'Welcome Back ' + req.user.username);
      const redirectUrl = req.session.returnTo || '/teacherdash/students';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    } else {
      console.log('Student logged in');
      req.flash('success', 'Welcome Back ');
      const redirectUrl = req.session.returnTo || '/studentdash/home';
      delete req.session.returnTo;
      res.redirect(redirectUrl);
    }
  }
);

router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/login');
  });
});

module.exports = router;
