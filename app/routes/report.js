var express = require('express');
var router = express.Router(); 
const multer = require('multer');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const SubInfo = require('../schemas/subinfo');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');
const ReportModel=require(__path_models+'report');
const SubInfoModel=require(__path_models+'subinfo');

//cau hinh luu tru hinh anh tam thoi
const storage = multer.memoryStorage();  // Lưu trữ tạm thời trong bộ nhớ
const upload = multer({ storage });
router.post('/add',upload.single('image'),async(req,res,next)=>{
    try {
      // Lấy dữ liệu hình ảnh từ file đã tải lên
      const {buffer } = req.file;
      const { email,description,location,severity } = JSON.parse(req.body.request);
      if (!req.file || !req.body.request) {
        return res.status(400).json({
          success: false,
          message: 'Missing image or request data',
          data:[]
        });
      }
      // Tiến hành lưu ảnh vào MongoDB
      const _id=await MainModel.listUsers({'email':email},{'task':'email'});
      let param0 = {
        location,
        reportedBy: _id,
        severity,
      };
      const pothole=await PotHoleModel.addPothole(param0);
      const image = await PotHoleModel.editPothole({'_id':pothole._id,'image':buffer},{'task':'image'});
      let param={
        reportedBy:_id,
        reportedInfo:pothole,
        description:description
      };
      const report=await ReportModel.addReport(param);
      await SubInfoModel.update(pothole,{'task':'oneReport'});
      res.status(200).json({ 
        success:true,
        message: '',
        data:[_id]});
      }catch (error) {
      res.status(500).json({ 
        success:false,
        message: 'Error save report',
        data:[]});
    }
});
module.exports = router;