module.exports.loginValidate = function (req, res, next) {
  let errors = [];
  if (!req.body.username) {
    errors.push('user name is required');
  }
  if (!req.body.password) {
    errors.push('password is required')
  }
  if (errors.length) {
    res.render('login.pug', {
      errors: errors,
      value: req.body
    });
    return;
  }
  next();
}