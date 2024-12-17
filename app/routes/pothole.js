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

//tim so luong pothole dua tren muc do
router.get('/find/severity',async (req,res,next)=>{
    try{
        const totalPothole=await PotHoleModel.listPotholes({},{'task':'severity_all'});
        const smallPothole=await PotHoleModel.listPotholes({},{'task':'severity_small'});
        const mediumPothole=await PotHoleModel.listPotholes({},{'task':'severity_medium'});
        const largePothole=await PotHoleModel.listPotholes({},{'task':'severity_large'});
        return res.status(200).json({
            success:true,
            message:"",
            data:[{
                total:totalPothole,
                small:smallPothole,
                medium:mediumPothole,
                large:largePothole
            }]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error find severity",
            data:[]
        })
    }  
})

//lay du lieu subinfo, can gui 
router.post('/subinfo',async (req,res,next)=>{
    const {email}=req.body;
    try{
        const _id=await MainModel.listUsers({'email':email},{'task':'email'});
        const data=await SubInfo.listSubinfo({'userID':_id._id},{'task':'one'});
        return res.status(200).json({
            success:true,
            message:"",
            data:[data]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error find info",
            data:[]
        })
    }  
})

//luu khoang cach len server, can truyen len email
router.post('/save/distance',async (req,res,next)=>{
    const {email,totalDistances}=req.body;
    try{
        const _id=await MainModel.listUsers({'email':email},{'task':'email'});
        await SubInfo.update({'_id':_id._id},{'task':'distance'})
        return res.status(200).json({
            success:true,
            message:"",
            data:[]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error saving distance",
            data:[]
        })
    }  
})
router.post('/find/month',async (req,res,next)=>{
    const {month,year}=req.body;
    if (!year || !month || month < 1 || month > 12) {
        return res.status(400).json({
            success: false,
            message: "Invalid time",
            data:[]
        });
    }
    const monthStart = new Date(year, month - 1, 1);
    const monthEnd = new Date(year, month, 0);
    try{
        const data=await PotHoleModel.listPotholes({
            'monthStart':monthStart,'monthEnd':monthEnd
        },{'task':'year'});
        const data_fixed=await PotHoleModel.listPotholes({
            'monthStart':monthStart,'monthEnd':monthEnd
        },{'task':'year_not_fixed'});
        return res.status(200).json({
            success:true,
            message:"",
            data:[{
                pothole:data || 0,
                fixed_pothole:data_fixed||0
            }]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error find pothole by month",
            data:[]
        })
    }  
})


router.post('/find/year',async (req,res,next)=>{
    const {year}=req.body;
    const monthStartJan = new Date(year, 0, 1);
    const monthEndJan = new Date(year, 1, 0);
    const monthStartFeb = new Date(year, 1, 1);
    const monthEndFeb = new Date(year, 2, 0);
    const monthStartMar = new Date(year,2, 1);
    const monthEndMar = new Date(year, 3, 0);
    const monthStartApr = new Date(year, 3, 1);
    const monthEndApr = new Date(year, 4, 0);
    const monthStartMay = new Date(year,4, 1);
    const monthEndMay = new Date(year, 5, 0);
    const monthStartJun = new Date(year,5, 1);
    const monthEndJun = new Date(year, 6, 0);
    const monthStartJul = new Date(year,6, 1);
    const monthEndJul = new Date(year, 7, 0);
    const monthStartAug = new Date(year,7, 1);
    const monthEndAug = new Date(year, 8, 0);
    const monthStartSep = new Date(year,8, 1);
    const monthEndSep = new Date(year, 9, 0);
    const monthStartOct = new Date(year,9, 1);
    const monthEndOct = new Date(year, 10, 0);
    const monthStartNov = new Date(year,10, 1);
    const monthEndNov = new Date(year, 11, 0);
    const monthStartDec = new Date(year,11, 1);
    const monthEndDec = new Date(year, 12, 0);
    try{
        //1
        const data_jan=await PotHoleModel.listPotholes({
            'monthStart':monthStartJan,'monthEnd':monthEndJan
        },{'task':'year'});
        const data_fixedJan=await PotHoleModel.listPotholes({
            'monthStart':monthStartJan,'monthEnd':monthEndJan
        },{'task':'year_fixed'});
        //2
        const data_feb=await PotHoleModel.listPotholes({
            'monthStart':monthStartFeb,'monthEnd':monthEndFeb
        },{'task':'year'});
        const data_fixedFeb=await PotHoleModel.listPotholes({
            'monthStart':monthStartFeb,'monthEnd':monthEndFeb
        },{'task':'year_fixed'});
        //3
        const data_mar=await PotHoleModel.listPotholes({
            'monthStart':monthStartMar,'monthEnd':monthEndMar
        },{'task':'year'});
        const data_fixedMar=await PotHoleModel.listPotholes({
            'monthStart':monthStartMar,'monthEnd':monthEndMar
        },{'task':'year_fixed'});
        //4
        const data_apr=await PotHoleModel.listPotholes({
            'monthStart':monthStartApr,'monthEnd':monthEndApr
        },{'task':'year'});
        const data_fixedApr=await PotHoleModel.listPotholes({
            'monthStart':monthStartApr,'monthEnd':monthEndApr
        },{'task':'year_fixed'});
        //5
        const data_may=await PotHoleModel.listPotholes({
            'monthStart':monthStartMay,'monthEnd':monthEndMay
        },{'task':'year'});
        const data_fixedMay=await PotHoleModel.listPotholes({
            'monthStart':monthStartMay,'monthEnd':monthEndMay
        },{'task':'year_fixed'});
        //6
        const data_jun=await PotHoleModel.listPotholes({
            'monthStart':monthStartJun,'monthEnd':monthEndJun
        },{'task':'year'});
        const data_fixedJun=await PotHoleModel.listPotholes({
            'monthStart':monthStartJun,'monthEnd':monthEndJun
        },{'task':'year_fixed'});
        //7
        const data_jul=await PotHoleModel.listPotholes({
            'monthStart':monthStartJul,'monthEnd':monthEndJul
        },{'task':'year'});
        const data_fixedJul=await PotHoleModel.listPotholes({
            'monthStart':monthStartJul,'monthEnd':monthEndJul
        },{'task':'year_fixed'});
        //8
        const data_aug=await PotHoleModel.listPotholes({
            'monthStart':monthStartAug,'monthEnd':monthEndAug
        },{'task':'year'});
        const data_fixedAug=await PotHoleModel.listPotholes({
            'monthStart':monthStartAug,'monthEnd':monthEndAug
        },{'task':'year_fixed'});
        //9
        const data_sep=await PotHoleModel.listPotholes({
            'monthStart':monthStartSep,'monthEnd':monthEndSep
        },{'task':'year'});
        const data_fixedSep=await PotHoleModel.listPotholes({
            'monthStart':monthStartSep,'monthEnd':monthEndSep
        },{'task':'year_fixed'});
        //10
        const data_oct=await PotHoleModel.listPotholes({
            'monthStart':monthStartOct,'monthEnd':monthEndOct
        },{'task':'year'});
        const data_fixedOct=await PotHoleModel.listPotholes({
            'monthStart':monthStartOct,'monthEnd':monthEndOct
        },{'task':'year_fixed'});
        //11
        const data_nov=await PotHoleModel.listPotholes({
            'monthStart':monthStartNov,'monthEnd':monthEndNov
        },{'task':'year'});
        const data_fixedNov=await PotHoleModel.listPotholes({
            'monthStart':monthStartNov,'monthEnd':monthEndNov
        },{'task':'year_fixed'});
        //12
        const data_dec=await PotHoleModel.listPotholes({
            'monthStart':monthStartDec,'monthEnd':monthEndDec
        },{'task':'year'});
        const data_fixedDec=await PotHoleModel.listPotholes({
            'monthStart':monthStartDec,'monthEnd':monthEndDec
        },{'task':'year_fixed'});

        return res.status(200).json({
            success:true,
            message:"",
            data:[{
                jan:{
                    pothole:data_jan || 0,
                    fixed_pothole:data_fixedJan||0
                },
                feb:{
                    pothole:data_feb || 0,
                    fixed_pothole:data_fixedFeb||0
                },
                mar:{
                    pothole:data_mar || 0,
                    fixed_pothole:data_fixedMar||0
                },
                apr:{
                    pothole:data_apr || 0,
                    fixed_pothole:data_fixedApr||0
                },
                may:{
                    pothole:data_may || 0,
                    fixed_pothole:data_fixedMay||0
                },
                jun:{
                    pothole:data_jun || 0,
                    fixed_pothole:data_fixedJun||0
                },
                jul:{
                    pothole:data_jul || 0,
                    fixed_pothole:data_fixedJul||0
                },
                aug:{
                    pothole:data_aug || 0,
                    fixed_pothole:data_fixedAug||0
                },
                sep:{
                    pothole:data_sep || 0,
                    fixed_pothole:data_fixedSep||0
                },
                oct:{
                    pothole:data_oct || 0,
                    fixed_pothole:data_fixedOct||0
                },
                nov:{
                    pothole:data_nov || 0,
                    fixed_pothole:data_fixedNov||0
                },
                dec:{
                    pothole:data_dec || 0,
                    fixed_pothole:data_fixedDec||0
                }
                
            }]
        })
   }catch{
        return res.status(500).json({
            success:false,
            message:"Error find pothole by month",
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