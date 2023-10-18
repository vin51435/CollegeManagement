const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// !Bare Bone details of a student
const studentSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  fatherName: {
    type: String,
    // required: true,
  },
  motherName: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
    maxLength: 10,
  },
  email: {
    type: String,
  },
  dob: {
    type: String,
  },
  sex: {
    type: String,
    enum: ['Female', 'Male', 'Other'],
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: Number,
  },
  department: {
    type: String,
    uppercase: true,
    enum: ['CS', 'IT'],
  },
  course: {
    type: String,
  },
  year: {
    type: String,
  },
  semester: {
    type: String,
  },
  div: {
    type: String,
  },
  roll: {
    type: Number,
    minimum: 0,
  },
  role: {
    type: String,
    default: 'student',
  },
  studentphoto: {
    url: String,
    filename: String,
  },
});
// !Add father  & mother occupation, addl student prn number and college id
const stuDetail = mongoose.model('stuDetail', studentSchema);

module.exports = stuDetail;
