const notFoundHandler = (req, res) =>{
	res.status(404);
	res.json({
		404: "No existe la página, suerte para la otra"
	})
}

module.exports = notFoundHandler;