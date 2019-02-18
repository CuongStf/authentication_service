const express = require("express");
const route = express.Router();
const userController = require("../Controllers/user.controller");
const userValidate = require('../validate/user.validate')

const multer = require('multer');
const upload = multer({
	dest: './public/upload/'
});


route.get("/", userController.root);

route.get("/search", userController.search);

route.get("/create", userController.renderCreate);

route.post("/create", upload.single('avatar'), userValidate.userValidate, userController.create);

route.get("/:id", userController.getByID);

module.exports = route;