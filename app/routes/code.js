var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const {mail_pasword,mail}=require('../config/system');
const nodemailer = require('nodemailer');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: mail, 
      pass: mail_pasword          
  }
});


//gui code de dang ki tai khoan, 
/**
 * @swagger
 * /code/register:
 *  post: 
 *        summary: Send verification code for register
 *        description: Send verification code for register
 *        responses:
 *          201: 
 *              description: Send successfully, send back code to client
 *          500:
 *              description: Error sending email
 */
router.post('/register', async (req,res,next)=>{
    //tao code 4 chu so
    const verificationCode = Math.floor(1000 + Math.random() * 9000); 
    const mailOptions = {
        from: mail,
        to:  req.body.email,
        subject: 'Email Verification Code For Pothole APP',
        text: `Your verification code is: ${verificationCode}`
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

  //gui code cho reset password
/**
 * @swagger
 * /code/password:
 *  post: 
 *        summary: Send verification code for reset password
 *        description: Send verification code for reset password
 *        responses:
 *          201: 
 *              description: Sent successfully
 *          400:
 *              description: Failed
 */
router.post('/password', async (req,res,next)=>{
    const verificationCode = Math.floor(1000 + Math.random() * 9000);
      const mailOptions = {
          from: mail,
          to:  req.body.email,
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

  //gui yeu cau edit email
/**
 * @swagger
 * /edit/email/email/:email:
 *  post: 
 *        summary: Find email in mongoDB
 *        description: Find email in mongoDB
 *        responses:
 *          200: 
 *              description: Changing email successfully
 *          400:
 *              description: Email already exists
 */
router.post('/email',async (req,res,next)=>{
  
    const verificationCode = Math.floor(1000 + Math.random() * 9000); // Mã 4 chữ số
    const mailOptions = {
        from: mail,
        to:  req.body.email,
        subject: 'Code For Changing Email',
        text: `Your code is: ${verificationCode}`
    };
    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ 
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
  module.exports=router;