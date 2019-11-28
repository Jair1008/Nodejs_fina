const db = require('../config/database');
const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();

//user.post("/", (req, res) => {
	/*const name = req.body.name;*/
	/*const mail = req.body.email;
	const pass = req.body.pass;
	const query = `INSERT INTO employed (email, user_password, user_name) VALUES ('${mail}', '${pass}', '${name}');`;
	db.query(query).then(rows => {
		if (rows.affectedRows >  0) {
			res.status(200);
			res.send({code: 0});
		}
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	})
});*/

user.post("/login", (req, res) =>{
	const email = req.body.email;
	const pass = req.body.pass;
	query = "SELECT * FROM employed WHERE "
	query += `email ='${email}' AND pass = '${pass}';`;

	db.query(query).then(rows => {
		if(rows.length == 1) {
			const token = jwt.sign(
				{
					id: rows[0].id,
					email: rows[0].email
				}, "debugkey");
			res.status(200);
			res.json({code: 0, message: token});
		}else{
			res.json({code: 1, message: "Usuario no encontrado"})
		}
	}).catch(err =>{
		console.log(err);
		res.status(500);
		rs.send("Algo salió mal");
	});
});

module.exports =  user;