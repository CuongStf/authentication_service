module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  // if they aren't redirect them to the home page
  res.redirect('/')
}
