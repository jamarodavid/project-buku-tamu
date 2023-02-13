const express = require("express");
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
	host: "localhost",
	database: "kedatangan",
	user: "root",
	password: "",
});

db.connect((err) => {
	if (err) throw err;
	console.log("database connected ...");

	const sql = "SELECT * FROM kedatangan";
	db.query(sql, (err, result) => {
		console.log("hasil database -> ", result);
	});

	app.get("/", (req, res) => {
		res.send("Ok route open");
	});
});

app.listen(3000, () => {
	console.log("Server sudah dimulai");
});
