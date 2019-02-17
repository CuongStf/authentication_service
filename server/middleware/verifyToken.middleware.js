const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.path.includes('/log/')) {
    next()
  } else {
    const header = req.headers.authorization
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ')
      const token = bearer[1]
      jwt.verify(token, process.env.SECRET_KEY, (err, authorized) => {
        if (err) {
          res.status(403).json(err)
        } else {
          console.log(authorized)
          next()
        }
      })
    } else {
      res.status(401).json({
        message: {
          errors: ['authorization fail']
        }
      })
    }
  }
}
