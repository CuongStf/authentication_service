const db = require("../db");
const userModel = require('../models/user.model.js')

module.exports.root = (req, res) => {
	userModel.find().then(function(user) {
		res.render("index.pug", {
			listUsers: user
		});
	})
};

module.exports.create = async(req, res) => {
	let currentID = await db.get("users").value().length;
	req.body.id = (await currentID) + 1;
	req.body.avatar = req.file.path.split('/').slice(1).join('/');
	console.log(req.body)
	db.get("users")
		.push(req.body)
		.write();
	res.redirect("/users");
};

module.exports.search = (req, res) => {
	let resultSearch = db
		.get("users")
		.value()
		.filter(item => {
			return item.name.includes(req.query.name);
		});
	res.render("index.pug", {
		listUsers: resultSearch,
		keyworkSearch: req.query.name
	});
};

module.exports.getByID = (req, res) => {
	let resultUser = db
		.get("users")
		.find({
			id: Number(req.params.id)
		})
		.value();
	res.render("detail.pug", {
		user: resultUser
	});
};

module.exports.renderCreate = (_req, res) => {
	res.render("create.pug");
};