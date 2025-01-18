const mysql = require("mysql2");

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbuniversitas",
});

const getAllItems = (req, res) => {
  db.query("SELECT * FROM kelas", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const kelas = results;

    const query = `
      SELECT 
        kelas.nama_kelas AS kelas_nama, 
        kelas.semester AS kelas_semester,
        profile_pengguna.nama_lengkap,
        profile_pengguna.username,
        profile_pengguna.password,
        DATE_FORMAT(profile_pengguna.tanggal_lahir, '%d/%m/%y') AS tanggal_lahir,
        profile_pengguna.status
    FROM 
        profile_pengguna 
    JOIN 
        kelas ON profile_pengguna.id_kelas = kelas.id_kelas;
`;
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.render("home", {
        kelas,
        profile_pengguna: results,
      });
    });
  });
};

module.exports = {
  getAllItems,
};
