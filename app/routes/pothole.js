var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');
router.get("/",async (req,res,next)=>{
    
})


module.exports = router;