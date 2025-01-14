const express = require("express");
const routes = express.Router();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud-express",
});

routes.get("/personal-information", (req, res) => {
  res.render("personal-information/index");
});

routes.get("/api/personal-information", (req, res) => {
  db.query("SELECT * FROM personal_information", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ result });
  });
});

routes.get("/personal-information/create", (req, res) => {
  res.render("personal-information/create");
});

routes.post("/api/personal-information/create", (req, res) => {
  const { name, price, description } = req.body;
  db.query("INSERT INTO personal_information SET name = ?, price = ?, description = ?", [name, price, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error creating product" });
    }
    res.status(201).json({ message: "Product created successfully", result });
  });
});

routes.get("/personal-information/edit/:id", (req, res) => {
  res.render("personal-information/edit");
});

routes.put("/api/personal-information/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  db.query("UPDATE produk SET name = ?, price = ?, description = ? WHERE id = ?", [name, price, description, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: "Product updated successfully", result });
  });
});

routes.get("/api/personal-information/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM produk WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.status(200).json({ message: "Product deleted successfully", result });
  });
});
module.exports = routes;
