const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: String,
	birthday: Number
})

// must have declared before mongoose.model, this methods declared outside schema => it's prototype 
// for instance: let new_user = new user({....}); new_user.drink_coffee()
userSchema.methods.drink_coffee = () => {

}

const user = mongoose.model('user', userSchema)

module.exports = user