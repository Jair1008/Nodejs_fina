const db = require('../config/database');
const express = require('express');
const employed = express.Router();


employed.get("/", (req, res) => {
	db.query("SELECT * FROM employed").then(rows => {
		if(rows.length > 0)
		res.status(200);
		res.json(rows);
	}).catch(err =>{
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	});
});


employed.get("/:name([A-Za-z]+)", (req, res) => {
	const name = req.params.name;
	const query =(`SELECT * FROM employed WHERE name='${name}'`)
	db.query(query).then(rows=>{
		res.status(200);
		res.json(rows);
	}).catch(err =>{
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	})
});



employed.post("/", (req, res) =>{
	let query = "INSERT INTO employed(name, pass, last_name, phone, email, address)";
	query += `VALUES('${req.body.name}','${req.body.pass}','${req.body.last_name}','${req.body.phone}','${req.body.email}','${req.body.address}')`;
	db.query(query).then(rows => {
		if (rows.affectedRows >  0) {
			res.status(200);
			res.send("employed añadido con éxito");
		}
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	})
});

employed.delete("/:id([0-9]{1,3})", (req, res)=>{
	query = `DELETE * FROM employed WHERE id=${req.params.id}`;
	db.query(query).then(rows =>{
		res.status(200);
		console.log(rows);
		res.send("employed eliminado correctamente");
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal.");                 
	});
});

employed.put("/:id([0-9]{1,3})", (req, res) =>{
	const columns = Object.keys(req.body);
	const values = Object.values(req.body);
	query = "UPDATE employed SET";
	for (let i = 0; i < columns.length; i++) {
		query += `${columns[i]} = `;
		query += isNaN(values[i]) ? `'${values[i]}'` : `${values[i]}`;
		query += (i + 1 < columns.length) ? ", " : " ";
	};
	query +=  `WHERE id = ${req.params.id};`;
	res.send(query);
});
	
module.exports = employed;