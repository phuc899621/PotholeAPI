var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const subinfo = require('../schemas/subinfo');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');
const SubInfo=require(__path_models+'subinfo');

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
        const data= await PotHoleModel.addPothole(param);
        await SubInfo.update(data,{'task':'oneReport'});
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

//
router.post('/find/severity',async (req,res,next)=>{
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





router.post('/addAll',async (req,res,next)=>{
    const users = await MainModel.listUsers({},{'task':'all'});
    for (const user of users) {
        const potholeCount = await PotHoleModel.listPotholes({'_id':user._id},{'task':'count'});
        let param=[];
        param.reportedBy=user._id;
        param.totalReport=potholeCount;
        await SubInfo.update(param,{'task':'allReport'});
    } 
})
//chinh sua cac 
module.exports = router;