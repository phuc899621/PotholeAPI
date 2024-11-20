
var express = require('express');
var router = express.Router(); 

router.use('/auth',require("./auth"));
router.use('/edit',require('./edit'));
router.use('/pothole',require('./pothole'));
router.use('/find',require('./find'));
router.use('/code',require('./code'));
module.exports = router; 
