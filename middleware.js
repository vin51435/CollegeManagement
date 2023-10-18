const { addStud } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  } else if (req.user.role === 'Teacher') {
    // console.log('middleware console', req.user.username);
    next();
  }
};
module.exports.isLoggedInStu = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', 'You must be signed in first!');
    return res.redirect('/login');
  } else if (req.user.role === 'Student') {
    // console.log('middleware console', req.user.username);
    next();
  }
};
module.exports.validateStudent = (req, res, next) => {
  const { error } = addStud.validate(req.body);
  // console.log('validate body', req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
