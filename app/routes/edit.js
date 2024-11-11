var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const { password, username } = require('../config/database');
const {mail_pasword,mail}=require('../config/system');
const nodemailer = require('nodemailer');
const controllerName='users';
const MainModel=require(__path_models+controllerName);
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: mail, 
      pass: mail_pasword          
  }
});
//kiem tra xem email co trong csdl ko
/**
 * @swagger
 * /edit/password/email:
 *  post: 
 *        summary: Check if email exists or not
 *        description: Check if email exists or not
 *        responses:
 *          201: 
 *              description: email exists
 *          400:
 *              description: email not found
 */
router.post('/password/email',async (req,res,next)=>{
    const emailClient=req.body.email;
    const email=await MainModel.listUsers({'email':emailClient},{'task':'registerEmail'});
    if(!email){
        return res.status(400).json({
            success:false,
            message:'Email not found',
            data:[]
        })
    }
    return res.status(200).json({
        success:true,
        message:'',
        data:[]
    })

})
//gui code
/**
 * @swagger
 * /edit/password/email/code:
 *  post: 
 *        summary: Send verification code for reset password
 *        description: Send verification code for reset password
 *        responses:
 *          201: 
 *              description: Sent successfully
 *          400:
 *              description: Failed
 */
router.post('/password/email/code', async (req,res,next)=>{
    const verificationCode = Math.floor(1000 + Math.random() * 9000); // Mã 4 chữ số
    const clientEmail=req.body.email;
      const mailOptions = {
          from: mail,
          to:  clientEmail,
          subject: 'Code For Reseting Password',
          text: `Your code is: ${verificationCode}`
      };
      try {
          await transporter.sendMail(mailOptions);
          return res.status(201).json({ 
            success:true,
            message:verificationCode, 
            data:[] });
      } catch (error) {
          return res.status(500).json({ 
            success:false,
            message: 'Error sending email', 
            data:[] });
      }
  })

  //gui len email va password moi
/**
 * @swagger
 * /edit/password:
 *  put: 
 *        summary: Edit password
 *        description: Edit password
 *        responses:
 *          201: 
 *              description: Edit successfully
 *          400:
 *              description: Failed
 */
router.put('/password', async (req,res,next)=>{
  try{
    const emailClient=req.body.email;
    const user=await MainModel.listUsers({'email':emailClient},{'task':'resetPassword'});
    if(!user){
      return res.status(400).json({
        success:false,
        message:"Error",
        data:[]
        });
    }
    const hashPassword=await bcrypt.hash(req.body.password,10);
    const data= await MainModel.editUser({'email':emailClient,'password':hashPassword},{'task':'password'})
    return res.status(201).json({
      success:true,
      message:'',
      data:[data]
      });
    }catch{
    return res.status(400).json({
      success:false,
      message:"Error",
      data:[]
      });
    }
})

//thay doi thong tin, can email, tao 1 class UserEditRequest
/**
 * @swagger
 * /edit/info/email/:email:
 *  put: 
 *        summary: Edit user information if email exists
 *        description: Edit user information if email exists
 *        responses:
 *          201: 
 *              description: Edit successfully
 *          400:
 *              description: Failed
 */
router.put('/info/email/:email',async (req,res,next)=>{
  const emailClient=await MainModel.listUsers({'email':req.params.email},{'task':'edit'})
  if(!emailClient) {
    return res.status(400).json({
      success:false,
      message:"No email found",
      data:[]
    })
  }
  
  try{
    const body=req.body;
    const data=await MainModel.editUser({'email':req.params.email,'body':body},{'task':'edit'})
      res.status(201).json({
        success:true,
        message:"",
        data:[data]
    })
  }catch{
    res.status(400).json({
        success:false,
        message:"Error",
        data:[]
      })
  } 
})
module.exports = router;