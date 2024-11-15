var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const {mail_pasword,mail}=require('../config/system');
const nodemailer = require('nodemailer');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');

//CheckRequest class

//kiem tra email, gui email tra ve data
/**
 * @swagger
 * /find/email:
 *  post: 
 *        summary: Check if email already exist
 *        description: Check if email already exist
 *        responses:
 *          201: 
 *              description: Server can send verification email code
 *          404:
 *              description: Email not found
 */
router.post('/email',async (req,res,next)=>{
    const email=await MainModel.listUsers({'email':req.body.email},{'task':'email'});
    if(!email){
        return res.status(404).json({
            success:false,
            message:'Email not found',
            data:[]
        })
    }
    return res.status(200).json({
        success:true,
        message:'',
        data:[email]
    })

})

//kiem tra email, gui email tra ve data
/**
 * @swagger
 * /find/email/non:
 *  post: 
 *        summary: Check if email already exist
 *        description: Check if email already exist
 *        responses:
 *          201: 
 *              description: Can create new email
 *          408:
 *              description: Email already exist
 */
router.post('/email/non',async (req,res,next)=>{
    const email=await MainModel.listUsers({'email':req.body.email},{'task':'email'});
    if(email){
        return res.status(409).json({
            success:false,
            message:'Email already exists',
            data:[]
        })
    }
    return res.status(200).json({
        success:true,
        message:'',
        data:[email]
    })

})

//kiem tra xem email va username, gui len email va username
/**
 * @swagger
 * /find/register/non:
 *  post: 
 *        summary: Check if username or email already exist
 *        description: Check if username or email already exist
 *        responses:
 *          200: 
 *              description: Server can send verification email code or create new user
 *          409:
 *              description: username or email already exist
 */
router.post('/register/non', async (req,res,next)=>{
  
    const email=await MainModel.listUsers({'email':req.body.email},{'task':'email'});
    const username=await MainModel.listUsers({'username':req.body.username},{'task':'username'});
    if(username){
      return res.status(409).json({
          success:false,
          message:"Already have this username",
          data:[]
        });
    };
    if(email){
        return res.status(409).json({
          success:false,
          message:"Already have this email",
          data:[]
        });
    };
    return res.status(200).json({ 
      success:true,
      message:"", 
      data:[] });
    })
    const MainModel2 = require(__path_schemas+'users');
router.post('/image',async (req,res,next)=>{
    const email=await MainModel.listUsers({'email':req.body.email},{'task':'image'});
    if(!email){
        return res.status(404).json({
            success:false,
            message:'Email not found',
            data:[]
        })
    }
    const imageBase64 = email.image.toString('base64');

    return res.status(200).json({
        success:true,
        message:'',
        data:[{'image':imageBase64}]
    })



})
module.exports=router;