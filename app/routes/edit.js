var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const {mail_pasword,mail}=require('../config/system');
const nodemailer = require('nodemailer');
const MainModel=require(__path_models+'users');

//Cau hinh transporter de gui mail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mail, 
    pass: mail_pasword
  }
});

  //gui len email va password moi 
/**
 * @swagger
 * /edit/password:
 *  put: 
 *        summary: Edit password
 *        description: Edit password
 *        responses:
 *          200: 
 *              description: Edit successfully
 *          404:
 *              description: User not found
 *          500:
 *              description: Server error
 */
router.put('/password', async (req,res,next)=>{
  try{
    const user=await MainModel.listUsers({'email':req.body.email},{'task':'email'});
    if(!user){
      return res.status(404).json({
        success:false,
        message:"User not found",
        data:[]
        });
    }
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const data= await MainModel.editUser({'email':req.body.email,'password':hashPassword},{'task':'password'})
    return res.status(200).json({
      success:true,
      message:'',
      data:[data]
      });
    }catch{
    return res.status(500).json({
      success:false,
      message:"Server error",
      data:[]
      });
    }
})

//thay doi thong tin username,name, can email, tao 1 class UserEditRequest
/**
 * @swagger
 * /edit/info/:email:
 *  put: 
 *        summary: Edit user information if email exists
 *        description: Edit user information if email exists
 *        responses:
 *          201: 
 *              description: Edit successfully
 *          404:
 *              description: Email not found
 *          409: 
 *              description: Username already exists
 *          500:
 *              description: Server error
 *          
 * 
 * 
 * 
 */
router.put('/info/:email',async (req,res,next)=>{
  const emailClient=await MainModel.listUsers({'email':req.params.email},{'task':'email'});
  const username=await MainModel.listUsers({'username':req.body.username},
    {'task':'username'});
  if(!emailClient) {
    return res.status(404).json({
      success:false,
      message:"Email not found",
      data:[]
    })
  }
  if(username){
    const userEmail = Array.isArray(username) ? username[0].email : username.email;
    const userEmailClient=Array.isArray(username) ? emailClient[0].email : emailClient.email;
    if(userEmail!=userEmailClient){
      return res.status(409).json({
        success:false,
        message:"Username already exists",
        data:[]
      })
    }
  }
  
  try{
    const body=req.body;
    const data=await MainModel.editUser({'email':req.params.email,'body':body},{'task':'edit'})
      res.status(200).json({
        success:true,
        message:"",
        data:[data]
    })
  }catch{
    res.status(500).json({
        success:false,
        message:"Server error",
        data:[]
      })
  } 
})




//edit email
/**
 * @swagger
 * /edit/email/:email:
 *  put: 
 *        summary: Change email
 *        description: Change email
 *        responses:
 *          200: 
 *              description: Change email successfully
 *          500:
 *              description: Server error
 */
router.put('/email/:email',async (req,res,next)=>{
  
  const data=await MainModel.editUser({'email':req.params.email,'body':req.body},{'task':'edit'})
  if(data){
    return res.status(200).json({ 
      success:true,
      message:'', 
      data:[] 
    });
  }
  return res.status(500).json({ 
    success:false,
    message: 'Error', 
    data:[]
  });
})

 //Thay doi mat khau, can bie mat khau cu
/**
 * @swagger
 * /edit/password/change:
 *  put: 
 *        summary: Edit password
 *        description: Edit password
 *        responses:
 *          200: 
 *              description: Edit successfully
 *          404:
 *              description: User not found
 *          500:
 *              description: Server error
 */
router.put('/password/change', async (req,res,next)=>{
  const { oldPassword, newPassword,email } = req.body;
  // kiem tra mat khau 
  const data=await MainModel.listUsers({'email':email},{'task':'email'})
  if(!data){
    return res.status(404).json({
      success:false,
      message:"Email not found",
      data:[]
      });
  } 
  const isMatch = await bcrypt.compare(oldPassword, data.password);
  if(!isMatch){
    return res.status(400).json({
      success:false,
      message:"Wrong old password",
      data:[]
      });
  } 
  try{
    const hashPassword=await bcrypt.hash(newPassword,10);
    const data= await MainModel.editUser({'email':email,'password':hashPassword},{'task':'password'})
    return res.status(200).json({
      success:true,
      message:'',
      data:[data]
      });
    }catch{
    return res.status(500).json({
      success:false,
      message:"Server error",
      data:[]
      });
    }
})
module.exports = router;