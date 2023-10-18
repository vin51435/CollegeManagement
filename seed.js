const mongoose = require('mongoose');
const student = require('./models/studentTemp');
const dbURL = process.env.DB_URL

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MONGO CONNECTION OPEN!!!');
  })
  .catch((err) => {
    console.log('OH NO MONGO CONNECTION ERROR!!!!');
    console.log(err);
  });

const studSeed = [
  {
    firstName: 'Vinay',
    secondName: 'Poojary',
    roll: 21,
    email: 'v3p51435@gmail.com',
    department: 'CS',
  },
  {
    firstName: 'Viraj',
    secondName: 'Hawale',
    roll: 69,
    email: '',
    department: 'CS',
  },
  {
    firstName: 'Arbaz',
    secondName: 'Khan',
    roll: 420,
    email: '',
    department: 'cs',
  },
  {
    firstName: 'Taslim',
    secondName: 'Khan',
    roll: 7,
    email: '',
    department: 'cs',
  },
  {
    firstName: 'Mohsin',
    secondName: 'Faruque',
    roll: 14,
    email: '',
    department: 'cs',
  },
  {
    firstName: 'Faraz',
    secondName: 'Faruque',
    roll: 1,
    email: 'dumbboi@gmail.com',
    department: 'CS',
  },
];
student
  .insertMany(studSeed)
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
