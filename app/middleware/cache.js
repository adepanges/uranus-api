module.exports = (app) => {
	app.use((req, res, next) => {
		let key = '__express__' + req.originalUrl || req.url;
		
		next();
	});
}