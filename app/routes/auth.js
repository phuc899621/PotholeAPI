// routes/auth.js
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

/**
 * @swagger
 * /auth/:
 *  get: 
 *        summary: Get all user
 *        description: get all user
 *        responses:
 *          201: 
 *              description: Get all user info
 *          400:
 *              description: Failed
 */
router.get('/',async (req,res,next)=>{
  try{
    //dat dieu kien task=all thi lay het
    const data=await MainModel.listUsers({},{'task':'all'})
    res.status(201).json({
      success:true,
      data:Array.isArray(data)? data: [data]
    })
  }catch{
    res.status(400).json({
      success:false,
      message:"Error",
      data:[]
    })
  }
})


//lay 1 user co id
/**
 * @swagger
 * /auth/find/:id:
 *  get: 
 *        summary: find a user with id
 *        description: this api is used to get one user with id
 *        responses:
 *          201: 
 *              description: get a user with id
 *          400:
 *              description: Failed
 */
router.get('/find/:id',async (req,res,next)=>{
  try{
    //dat dieu kien task=one thi lay 1
    const data=await MainModel.listUsers({'id':req.params.id},{'task':'one'});
    res.status(201).json({
    success:true,
    data:Array.isArray(data)? data: [data]
    })
  }catch{
    res.status(400).json({
      success:false,
      message:"Error",
      data:[]
    })
  }
})


//dang nhap
/**
 * @swagger
 * /auth/login:
 *  post: 
 *        summary: Login with username and password
 *        description: Login with username and password
 *        responses:
 *          201: 
 *              description: login success
 *          400:
 *              description: Failed
 */
router.post('/login',async (req,res,next)=>{
  try{
    //dat dieu kien task=one thi lay 1
    const username=req.body.username;
    const passwordNonHash=req.body.password;
   
    const data=await MainModel.listUsers({'username':username},{'task':'login'});
    
    if(!data){
      return res.status(400).json({
        success:false,
        message:'No user found',
        data:[]
      })
    }
    const storedPassword=data.password;
    const isMatch=await bcrypt.compare(passwordNonHash,storedPassword); 
    if(isMatch){
      return res.status(201).json({
          success:true,
          message:'',
          data:Array.isArray(data)? data: [data]
      });
    }  
    res.status(400).json({
          success:false,
          message:'Wrong Password',
          data:[]
    }) 
  }catch{
    res.status(400).json({
      success:false,
      message:'Error',
      data:[]
    })
  }
})

//kiem tra xem email va username co ton tai ko
/**
 * @swagger
 * /auth/register:
 *  post: 
 *        summary: Check if username or email already exist
 *        description: Check if username or email already exist
 *        responses:
 *          201: 
 *              description: Server can send verification email code
 *          400:
 *              description: username or email already exist
 */
router.post('/register', async (req,res,next)=>{
  
    let param=[];
    param.username=req.body.username;
    param.email=req.body.email;
    const email=await MainModel.listUsers({'email':param.email},{'task':'registerEmail'});
    const username=await MainModel.listUsers({'username':param.username},{'task':'registerUsername'});
    if(username){
      return res.status(400).json({
          success:false,
          message:"Already have this username",
          data:[]
        });
    };
    if(email){
        return res.status(400).json({
          success:false,
          message:"Already have this email",
          data:[]
        });
    };
    return res.status(201).json({ 
      success:true,
      message:"", 
      data:[] });
    })
/**
 * @swagger
 * /auth/register/email/code:
 *  post: 
 *        summary: Send verification code for register
 *        description: Send verification code for register
 *        responses:
 *          201: 
 *              description: Send successfully
 *          400:
 *              description: Failed
 */
router.post('/register/email/code', async (req,res,next)=>{
  const verificationCode = Math.floor(1000 + Math.random() * 9000); // Mã 4 chữ số
  const clientEmail=req.body.email;
    const mailOptions = {
        from: mail,
        to:  clientEmail,
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

/**
 * @swagger
 * /auth/register/add:
 *  post: 
 *        summary: Add new user to database
 *        description: Add new user to database
 *        responses:
 *          201: 
 *              description: add successfully
 *          400:
 *              description: Failed
 */
router.post('/register/add', async (req,res,next)=>{
  let param=[];
  param.id=makeId(8);
  param.username=req.body.username;
  param.name=req.body.name;
  param.email=req.body.email;
  param.password=await bcrypt.hash(req.body.password,10);
  const data=await MainModel.create(param);
  if(!data){
    return res.status(400).json({
      success:false,
      message:"Error",
      data:[]
      });
  }
  return res.status(201).json({
    success:true,
    message:'',
    data:[data]
    });
})


/**
 * @swagger
 * /delete/:id:
 *  delete: 
 *        summary: Delete user
 *        description: this api is used to delete user
 *        responses:
 *          201: 
 *              description: To delete user
 *          400:
 *              description: Failed
 */
router.delete('/delete/:id',async (req,res,next)=>{
  try{
    const data=await MainModel.deleteUser({'id':req.params.id},{'task':'one'})
    res.status(201).json({
      success:true,
      message:"",
      data:Array.isArray(data)? data: [data]
  })
  }catch{
    res.status(400).json({
      success:false,
      message:"Error",
      data:[]
    })
  } 
})
module.exports = router; // Đảm bảo export router đúng cách

//tao id ngau nhien
makeId=(number)=>{
  let text="";
  let possible="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for(let i=0;i<number;i++) text+=possible.charAt(Math.floor(Math.random()*possible.length));
  return text;
}