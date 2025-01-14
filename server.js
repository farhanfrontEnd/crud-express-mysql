const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud-express",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Berhasil connect to database");
});

app.get("/dashboard", (req, res) => {
  res.render("home");
});

app.get("/admin-page", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

const productRouter = require("./controller/products");
const personalRouter = require("./controller/personalInformation");

app.use("/product", productRouter);
app.use(personalRouter);

app.listen(3000, () => {
  console.log("server berjalan di http://localhost:3000");
});
