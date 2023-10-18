const stuDetails = require('../models/studentTemp');
const announce = require('../models/annouce');
const stuMarks = require('../models/stuMarks');

module.exports.allStudents = async (req, res) => {
  const students = await stuDetails.find({}).sort({ roll: 1 });
  res.render('teadash/students', { students });
};
module.exports.rendorAddStudForm = async (req, res) => {
  res.render('teadash/stuAdd');
};
module.exports.addNewStud = async (req, res, next) => {
  const newStu = new stuDetails(req.body.studentAdd);
  // console.log('body', req.body);
  // console.log('file', req.file);
  newStu.studentphoto = { url: req.file.path, filename: req.file.filename };
  console.log('added student', newStu);
  await newStu.save();

  req.flash('success', 'Successfully made a new student!');
  res.redirect(`/teacherdash/students`);
};
module.exports.viewStudentDetail = async (req, res) => {
  const { id } = req.params;
  const student = await stuDetails.findById(id);
  if (!student) {
    req.flash('error', 'Cannot find that student!');
    return res.redirect('/teacherdash');
  }
  res.render('teadash/stuDetails', { student });
};
module.exports.editStudentDetailForm = async (req, res) => {
  const { id } = req.params;
  const student = await stuDetails.findById(id);
  if (!student) {
    req.flash('error', 'Cannot find that student!');
    return res.redirect('/teacherdash');
  }
  res.render('teadash/stuEdit', { student });
};
module.exports.updateStudentDetailForm = async (req, res) => {
  const { id } = req.params;
  const student = await stuDetails.findByIdAndUpdate(id, {
    ...req.body.studentAdd,
  });
  if (req.file.path) {
    student.studentphoto = { url: req.file.path, filename: req.file.filename };
  }
  console.log('edited', req.student);
  await student.save();
  req.flash('success', 'Successfully updated campground!');
  res.redirect(`/teacherdash/student/${student._id}`);
};
module.exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  const deleteStudent = await stuDetails.findByIdAndDelete(id);
  req.flash('success', 'Successfully deleted student');
  res.redirect('/teacherdash/students');
};
module.exports.loadStudentPerformance = async (req, res) => {
  const { id } = req.params;
  const student = await stuDetails.findById(id);
  //* test
  const stuMark = await stuMarks.findOne({});
  // console.log(stuMark);
  // console.log('marks: ', stuMark.submarks);
  // console.log('mark: ', stuMark.submarks[0]);
  // const stuMark = await stuMarks.findByIdAndUpdate(
  //   { _id: '630b025ed5689e897de24c37' },
  //   { $push: { subjects: sem7Subs } },
  //   { $push: { submarks: testMarks } }
  // );
  // console.log(stuMark);
  // *--
  res.render('teadash/stuperform', { student, stuMarks });
};
module.exports.newStudentPerformance = async (req, res) => {
  const { id } = req.params;
  const student = await stuDetails.findById(id);
  const lul = [req.body];
  console.log(lul);
  // const newStuMark = new stuMarks(req.body);
  // await newStuMark.save();
  req.flash('success', 'Successfully made a new student!');
  res.redirect(`/student/${student._id}/performance`);
  // const stuMark = await stuMarks.findById(id);
};
module.exports.rendorTimetable = async (req, res) => {
  res.render('teadash/classTimetable');
};
module.exports.viewAnnouncements = async (req, res) => {
  const author = req.user.username;
  const announcements = await announce.find({}).sort({ date: 'descending' });
  res.render('teadash/announce', { announcements, author });
};
module.exports.newAnnouncement = async (req, res) => {
  const newannounce = new announce(req.body);
  await newannounce.save();
  req.flash('success', 'Successfully made a new Announcment!');
  res.redirect(`/teacherdash/announcement`);
};
module.exports.deleteAnnouncement = async (req, res) => {
  const { id } = req.params;
  const deleteStudent = await announce.findByIdAndDelete(id);
  res.redirect('/teacherdash/announcement');
};
module.exports.studentStats = async (req, res) => {
  res.render('teadash/stustats');
};
