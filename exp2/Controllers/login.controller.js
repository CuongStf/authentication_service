const db = require("../db");
module.exports.postLogin = async(req, res) => {
	let checkUserExist = 0;
	db.get('listUsers').value().filter(item => {
		if (item.username == req.body.username && item.password == req.body.password) {
			checkUserExist = 1;
		}
		console.log(item.username, item.password)
	});
	if (checkUserExist === 1) {
		res.clearCookie('code');
		res.cookie('code', `${req.body.username}`, {
			signed: true
		});
		res.redirect("/");
	} else {
		let errors = ['Username or password is incorrect'];
		res.render('login.pug', {
			errors: errors,
			value: req.body
		});
	}
};


module.exports.login = (req, res) => {
	res.render("login.pug");
};