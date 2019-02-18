const db = require("../db");

module.exports.getListProducts = (req, res) => {
	let quantityProducts = db.get("products").value().length


	let page = parseInt(req.query.page) || 1
	let itemPerPage = 8
	let startIndex = (page - 1) * itemPerPage
	let finishIndex = page * itemPerPage
	let maxPage = 0
	let products = []

	if (quantityProducts % itemPerPage == 0) {
		maxPage = parseInt(quantityProducts / itemPerPage)
		products = db.get("products").value().slice(startIndex, finishIndex)
	} else {
		maxPage = parseInt(quantityProducts / itemPerPage) + 1
		let restProducts = (quantityProducts % itemPerPage)
		if (page === 7) {
			products = db.get("products").value().slice(quantityProducts - restProducts, quantityProducts)
		} else {
			products = db.get("products").value().slice(startIndex, finishIndex)
		}

	}


	res.render('product.pug', {
		products: products,
		page: page,
		maxPage: maxPage,
		minPage: 1
	});
};