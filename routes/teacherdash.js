const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { addStud } = require('../schemas.js');
const { isLoggedIn, validateStudent } = require('../middleware');
const Quote = require('inspirational-quotes');
const teacher = require('../controllers/teacher');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer({ storage });

const ExpressError = require('../utils/ExpressError');
const stuDetails = require('../models/studentTemp');
const announce = require('../models/annouce');
const stuMarks = require('../models/stuMarks');
// module.export = stuMarks;
// module.export = announce;

const classInfo = 'CS';
const semInfo = 7;
const departmentCat = ['IT', 'CS'];
const sem7Subs = [
  'Artificial Intelligence',
  'Software Testing and Quality Assurance',
  'Information and Network Security',
  'Web Services',
  'Game Programming',
];
const testMarks = [2, 4, 5, 1];

router.get('/home', isLoggedIn, (req, res) => {
  const mot = Quote.getQuote();
  res.render('teadash/teacherhome', { mot });
});

router.route('/students').get(isLoggedIn, catchAsync(teacher.allStudents)).post(
  // isLoggedIn,
  upload.single('studentAdd[studentphoto]'),
  validateStudent,
  catchAsync(teacher.addNewStud)
);

router.get(
  '/students/add',
  // isLoggedIn,
  catchAsync(teacher.rendorAddStudForm)
);

router
  .route('/student/:id')
  .get(isLoggedIn, catchAsync(teacher.viewStudentDetail))
  .put(
    // isLoggedIn,
    upload.single('studentAdd[studentphoto]'),
    validateStudent,
    catchAsync(teacher.updateStudentDetailForm)
  )
  .delete(isLoggedIn, catchAsync(teacher.deleteStudent));

router.get(
  '/student/:id/edit',
  // isLoggedIn,
  catchAsync(teacher.editStudentDetailForm)
);

router
  .route('/student/:id/performance')
  .get(isLoggedIn, catchAsync(teacher.loadStudentPerformance))
  .post(isLoggedIn, catchAsync(teacher.newStudentPerformance));

router.get('/ClassTimetable', isLoggedIn, catchAsync(teacher.rendorTimetable));

router
  .route('/announcement')
  .get(isLoggedIn, catchAsync(teacher.viewAnnouncements))
  .post(isLoggedIn, catchAsync(teacher.newAnnouncement));

router.delete(
  '/announcement/:id',
  isLoggedIn,
  catchAsync(teacher.deleteAnnouncement)
);

router.get('/classstats', isLoggedIn, catchAsync(teacher.studentStats));

module.exports = router;
