const express = require("express");
const routes = express.Router();

const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud-express",
});

routes.get("/", (req, res) => {
  db.query("SELECT * FROM produk", (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.render("product/index", {
      result,
    });
  });
});

routes.get("/create", (req, res) => {
  res.render("product/create");
});

routes.post("/api/create", (req, res) => {
  const { name, price, description } = req.body;
  db.query("INSERT INTO produk SET name = ?, price = ?, description = ?", [name, price, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error creating product" });
    }
    res.redirect("/product");
  });
});

routes.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM produk WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.render("product/edit", {
      result: result[0],
    });
  });
});

routes.post("/api/edit/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  db.query("UPDATE produk SET name = ?, price = ?, description = ? WHERE id = ?", [name, price, description, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    res.redirect("/product");
  });
});

routes.get("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM produk WHERE id = ?", [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.redirect("/product");
  });
});
module.exports = routes;
