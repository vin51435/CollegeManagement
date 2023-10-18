const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { addStud } = require('../schemas.js');
const { isLoggedInStu } = require('../middleware');

const ExpressError = require('../utils/ExpressError');
const stuDetails = require('../models/studentTemp');
const User = require('../models/user');
const announce = require('../models/annouce');

router.get('/home', isLoggedInStu, (req, res) => {
  res.render('studash/home');
});
// router.get('/profile', isLoggedIn, (req, res) => {
//   res.render('studash/profdash');
// });

router.get(
  // '/profile/:id',
  '/profile',
  isLoggedInStu,
  catchAsync(async (req, res) => {
    // *if shows username not found login again
    const reqUsername = req.user.username;
    const stuUser = await User.find({ username: reqUsername });
    const userEmail = stuUser[0].email;
    const stuDetail = await stuDetails.find({ email: userEmail });
    // console.log('stuDetail', stuDetail[0]);
    const student = stuDetail[0];
    res.render('studash/profdash', { student });
  })
);
router.get(
  '/announcement',
  isLoggedInStu,
  catchAsync(async (req, res) => {
    const announcements = await announce.find({}).sort({ date: 'descending' });
    res.render('studash/announce', { announcements });
  })
);
module.exports = router;
