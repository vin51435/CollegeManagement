const Joi = require('joi');
const { number } = require('joi');

module.exports.addStud = Joi.object({
  studentAdd: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    fatherName: Joi.string().allow(''),
    motherName: Joi.string().allow(''),
    phone: Joi.number().required().min(0),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    dob: Joi.string().required(),
    sex: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string(),
    zip: Joi.number(),
    department: Joi.string(),
    course: Joi.string().required(),
    year: Joi.string().required(),
    semester: Joi.string(),
    div: Joi.string().required(),
    roll: Joi.number().required().min(0),
  }).required(),
  studentphoto: Joi.string(),
}); 
