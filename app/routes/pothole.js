var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');

//lay du lieu tat ca pothole
router.get("/",async (req,res,next)=>{
  //try{
    const pothole=await PotHoleModel.listPotholes({},{'task':'all'});
    return res.status(200).json({
        success:true,
        message:"",
        data:Array.isArray(pothole)? pothole: [pothole]
    })
  //}catch{
    return res.status(500).json({
        success:false,
        message:"Error get pothole",
        data:[]
    })
 // }  
});

//them pothole
router.post('/add',async (req,res,next)=>{
    const {location,reportedBy,severity}=req.body;
    let param=[];
    param.location=location;
    param.reportedBy=reportedBy;
    param.severity=severity;
    //try{
        const pothole=await PotHoleModel.addPothole(param);
        return res.status(200).json({
            success:true,
            message:"",
            data:Array.isArray(pothole)? pothole: [pothole]
        })
   //   }catch{
        return res.status(500).json({
            success:false,
            message:"Error save pothole",
            data:[]
        })
//      }  

    
})


module.exports = router;