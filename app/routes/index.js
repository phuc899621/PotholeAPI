
// routes/auth.js
var express = require('express');
var router = express.Router(); // Đảm bảo router đã được tạo đúng cách

router.use('/auth',require("./auth"));
router.use('/edit',require('./edit'));

module.exports = router; // Đảm bảo export router đúng cách
