var express = require('express');
var router = express.Router(); 
const multer = require('multer');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const SubInfo = require('../schemas/subinfo');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');
const ReportModel=require(__path_models+'report');
//cau hinh luu tru hinh anh tam thoi
const storage = multer.memoryStorage();  // Lưu trữ tạm thời trong bộ nhớ
const upload = multer({ storage });
router.post('/add',upload.single('image'),async(req,res,next)=>{
    try {
      // Lấy dữ liệu hình ảnh từ file đã tải lên
      const {buffer } = req.file;
      const { email,description } = req.body;
      // Tiến hành lưu ảnh vào MongoDB
      const _id=await MainModel.listUsers({'email':email},{'task':'email'});
      let param0=[];
      param0.location=location;
      param0.reportedBy=_id;
      param0.severity=severity;
      const pothole=await PotHoleModel.addPothole({param});
      const image = await PotHoleModel.editPothole({'_id':pothole._id,'image':buffer},{'task':'image'});
      let param=[];
      param.reportedBy=_id;
      param.reportedInfo=pothole;
      param.description=description;
      const report=await ReportModel.addReport({param});
      await SubInfo.update(data,{'task':'oneReport'});
      res.status(200).json({ 
        success:true,
        message: '',
        data:[]});
    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: 'Error save report',
        data:[]});
    }
});
module.exports = router;