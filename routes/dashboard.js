const express = require("express");
const router = express.Router();

const { getAllItems } = require("../controller/dashboard");

router.get("/dashboard", getAllItems);

module.exports = router;
