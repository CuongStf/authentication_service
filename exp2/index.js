const express = require("express");
const app = express();
const body = require("body-parser");
const cookie = require('cookie-parser');

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/db");


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('connection successfully!');
})
app.use(body.json());
app.use(cookie('random_string_generate_to_assign_in_cookie_secret'));
app.use(body.urlencoded({
	extended: true
}));


// router and middleware

const middlewareAuth = require('./middlewares/checkAuth');
const middlewareSessionCookie = require('./middlewares/setSessionId.middleware.js');
// app.use(middlewareSessionCookie)

const userRoute = require("./route/user.route");
const loginRoute = require("./route/login.route")
const productRoute = require('./route/product.route.js')
app.use("/users", userRoute);
app.use('/login', loginRoute);
app.use('/products', productRoute);





//
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render('layouts/common.pug')
});




const port = process.env.PORT || 3030;

app.listen(port, () => {
	console.log(`You are live in port ${port} now!`);
});

// install --save-dev only use in development mode