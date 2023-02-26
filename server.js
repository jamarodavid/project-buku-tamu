const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "node_crud",
});

connection.connect(function (error) {
	if (!!error) console.log(error);
	else console.log("Database Connected!");
});

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// public
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/icon", express.static(__dirname + "public/icon"));
app.use("/img", express.static(__dirname + "public/img"));

app.get("/", (req, res) => {
	res.render("pages/home");
});

app.get("/home", (req, res) => {
	res.render("pages/home");
});

app.get("/register", (req, res) => {
	// res.send('CRUD Operation using NodeJS / ExpressJS / MySQL');
	let sql = "SELECT * FROM users";
	let query = connection.query(sql, (err, rows) => {
		if (err) throw err;
		res.render("pages/user_index", {
			title: "Register",
			users: rows,
		});
	});
});

app.get("/add", (req, res) => {
	res.render("pages/user_add", {
		title: "Isi form register di bawah ini",
	});
});

app.post("/save", (req, res) => {
	let data = {
		nama: req.body.nama,
		kontak: req.body.kontak,
		waktu: req.body.waktu,
		abjad_meja: req.body.abjad_meja,
		nomor_meja: req.body.nomor_meja,
	};
	let sql = "INSERT INTO users SET ?";
	let query = connection.query(sql, data, (err, results) => {
		if (err) throw err;
		res.redirect("/register");
	});
});

app.get("/promo", (req, res) => {
	res.render("pages/promo");
});

app.get("/creator", (req, res) => {
	res.render("pages/creator");
});

// Server Listening
app.listen(3000, () => {
	console.log("Server is running at port 3000");
});
