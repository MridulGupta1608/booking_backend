const express = require("express");
const router = express.Router();
const { login } = require("../Controller/auth.comtroller");

router.post("/login", login);

module.exports = router;
