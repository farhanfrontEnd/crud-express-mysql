const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbuniversitas",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Berhasil connect to database");
});

app.get("/", (req, res) => {
  const message = req.session.message;
  req.session.message = null;
  res.render("login", { message });
});

app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const query = "SELECT * FROM profile_pengguna WHERE username= ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const user = results[0];
        req.session.loggedin = true;
        req.session.user_id = user.id;
        req.session.username = user.username;
        console.log(req.session.username);
        res.redirect("/dashboard");
      } else {
        req.session.message = { type: "error", text: "Username atau Password Salah!" };
        res.redirect("/");
      }
    });
  } else {
    req.session.message = { type: "error", text: "Harap Masukkan Username dan password!" };
    res.redirect("/");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("gagal hapus session", err);
    } else {
      res.redirect("/");
    }
  });
});

const dashboardRouter = require("./routes/dashboard");
app.use(dashboardRouter);

app.listen(3000, () => {
  console.log("server berjalan di http://localhost:3000");
});
