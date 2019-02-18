module.exports = (req, res, next) => {
	console.log('not cookies')
	if (!req.signedCookies.sessionId) {
		res.cookie('sessionId', 'automatic', {
			signed: true
		});
	}
	next();
}