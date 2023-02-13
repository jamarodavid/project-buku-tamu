const express = require("express");
const mysql = require("mysql");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
	host: "localhost",
	database: "data_kunjungan_rm",
	user: "root",
	password: "",
});

db.connect((err) => {
	if (err) throw err;
	console.log("database connected ...");

	const sql = "SELECT * FROM kedatangan";
	db.query(sql, (err, result) => {
		const users = JSON.parse(JSON.stringify(result));
		console.log("hasil database -> ", users);
		app.get("/", (req, res) => {
			res.render("register", {
				users: users,
				title: "Register Rumah Makan Nusantara",
			});
		});
	});
});

app.listen(3000, () => {
	console.log("Server sudah dimulai");
});
