var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');

//lay du lieu tat ca pothole
router.get("/",async (req,res,next)=>{
  try{
    const pothole=await PotHoleModel.listPotholes({},{'task':'all'});
    return res.status(200).json({
        success:true,
        message:"",
        data:Array.isArray(pothole)? pothole: [pothole]
    })
  }catch{
    return res.status(500).json({
        success:false,
        message:"Server error",
        data:[]
    })
}  
});

//them pothole
//Gui len server class {location:[x,y],reportedBy:id cua user,severity:"small"}
router.post('/add',async (req,res,next)=>{
    const {location,email,severity}=req.body;
    const _id=await MainModel.listUsers({'email':email},{'task':'email'});;
    let param=[];
    try{
        param.location=location;
        param.reportedBy=_id;
        param.severity=severity;
        await PotHoleModel.addPothole(param);
        return res.status(200).json({
            success:true,
            message:"",
            data:[]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error save pothole",
            data:[]
        })
    }  
})
//lay pothole tu 1 user cu the
//can gui len email cua nguoi dung
router.post('/find/email',async (req,res,next)=>{
    const {email}=req.body;
    try{
        const _id=await MainModel.listUsers({'email':email},{'task':'email'});
        const data=await PotHoleModel.listPotholes({'_id':_id},{'task':'id'});
        return res.status(200).json({
            success:true,
            message:"",
            data:[data]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error find pothole",
            data:[]
        })
    }  
})


//chinh sua cac 
module.exports = router;