if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ExpressError = require('./utils/ExpressError');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const stuDetails = require('./models/studentTemp');

const userRoutes = require('./routes/users');
const teacherdashRoutes = require('./routes/teacherdash');
const studentdashRoutes = require('./routes/studentdash');

const MONGODB_URI =
  'mongodb+srv://root:root@cluster0.oau3jje.mongodb.net/?retryWrites=true&w=majority';
//
mongoose
  .connect(MONGODB_URI || 'mongodb://localhost:27017/students', {
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

// mongoose.connection.on('connected', () => {
//   console.log('Mongoose is connected');
// });
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // console.log('req.session', req.session);
  // console.log('req.user', req.user);
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.get('/', (req, res) => {
  res.render('users/login');
});

app.use('/teacherdash', teacherdashRoutes);
app.use('/studentdash', studentdashRoutes);
app.use('/', userRoutes);

// app.get('/studentdash/profile', async (req, res) => {
//   const student = await stuDetails.findById(id);
//   res.render('studash/profdash', { student });
// });
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
  // res.redirect('/login');
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Oh No, Something Went Wrong!';
  res.status(statusCode).render('error', { err });
});
app.use((req, res) => {
  res.status(404).send('Not Found');
});

app.listen(6969, () => {
  console.log('LISTENING ON PORT 6969');
});
