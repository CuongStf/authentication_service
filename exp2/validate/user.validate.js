module.exports.userValidate = function (req, res, next) {
  let errors = [];
  if (!req.body.name) {
    errors.push('user name is required');
  }
  if (!req.body.birthday) {
    errors.push('Birday is required');
  }
  if (errors.length) {
    res.render('create.pug', {
      errors: errors,
      value: req.body
    });
    return;
  }
  next();
}