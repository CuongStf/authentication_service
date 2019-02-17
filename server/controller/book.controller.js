const BookModel = require('../model/book.model.js')

module.exports.index = async (req, res, next) => {
  try {
    const data = await BookModel.find()
    res.json(data)
  } catch (err) {
    next(err)
  }
}

module.exports.createBook = async (req, res, next) => {
  try {
    let newBook = new BookModel(req.body)
    newBook.save((err, book) => {
      if (err) {
        return res.status(400).send({
          message: err
        })
      } else {
        res.json(book)
      }
    })
  } catch (err) {
    next(err)
  }
}

module.exports.deleteBook = async (req, res, next) => {
  try {
    if (req.body._id) {
      BookModel.deleteOne({
        _id: req.body._id
      }, function (err) {
        if (err) {
          return res.status(400).send({
            message: err
          })
        } else {
          res.json('delete success!')
        }
      })
    }
  } catch (err) {
    next(err)
  }
}

module.exports.editBook = async (req, res, next) => {
  try {

  } catch (err) {
    console.log(err)
    next(err)
  }
}
