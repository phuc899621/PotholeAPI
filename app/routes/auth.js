// routes/auth.js
var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const { password, username } = require('../config/database');

const controllerName='users';
const MainModel=require(__path_models+controllerName);

/**
 * @swagger
 * /:
 *  get: 
 *        summary: this api is used to get all users on database
 *        description: this api is used to get all users on database
 *        responses:
 *          201: 
 *              description: To get all users
 *          400:
 *              description: Failed
 */
router.get('/',async (req,res,next)=>{
  try{
    //dat dieu kien task=all thi lay het
    const data=await MainModel.listUsers({},{'task':'all'})
    res.status(201).json({
      success:true,
      data:data
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
 * /find/:id:
 *  get: 
 *        summary: this api is used to get one user with id
 *        description: this api is used to get one user with id
 *        responses:
 *          201: 
 *              description: To get one user
 *          400:
 *              description: Failed
 */
router.get('/find/:id',async (req,res,next)=>{
  try{
    //dat dieu kien task=one thi lay 1
    const data=await MainModel.listUsers({'id':req.params.id},{'task':'one'});
    res.status(201).json({
    success:true,
    data:data
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
 * /login:
 *  post: 
 *        summary: this api is used to login
 *        description: this api is used to login
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
    if(!data||data.length==0){
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
          data:data
      });
    }  
    if(!isMatch) res.status(400).json({
          success:false,
          message:'Wrong Password',
          data:data
    }) 
  }catch{
    res.status(400).json({success:false})
  }})

//dung async de cho doi thuc hien
//them vao 1 item
/**
 * @swagger
 * /register:
 *  post: 
 *        summary: this api is used to add one user with username, name, password
 *        description: this api is used to add one user with username, name, password
 *        responses:
 *          201: 
 *              description: To add user
 *          400:
 *              description: Failed
 */
router.post('/register', async (req,res,next)=>{
  try{
    let param=[];
    param.id=makeId(8);
    param.username=req.body.username;
    param.name=req.body.name;
    param.email=req.body.email;
    const passwordNonHash=req.body.password;
    const user=await MainModel.listUsers({'email':param.email},{'task':'register'});
    if(user.length!=0||user){
      if(param.username==user.username){
        res.status(400).json({
          success:false,
          message:"Already have this username",
          data:[]
        });
      }
      else{
        res.status(400).json({
          success:false,
          message:"Already have this email",
          data:[]
        });
      }
    }else{
      param.password=await bcrypt.hash(passwordNonHash,10);
      //can tao phuong thuc create o models/users
      const data=await MainModel.create(param);
      //neu luu thanh cong thi in ra thong bao
      res.status(201).json({
        success:true,
        message:"",
        data:data
    });
    }
  }catch{
    res.status(400).json({
      success:false,
      message:"Error",
      data:[]
    })
  }
})




/**
 * @swagger
 * /edit/:id:
 *  put: 
 *        summary: this api is used to update user
 *        description: this api is used to update user
 *        responses:
 *          201: 
 *              description: To update user
 *          400:
 *              description: Failed
 */
router.put('/edit/:id',async (req,res,next)=>{
  try{
    const body=req.body;
    const data=await MainModel.editUser({'id':req.params.id,'body':body},{'task':'edit'})
    res.status(201).json({
      success:true,
      data:data
  })
  }catch{
    res.status(400).json({
      success:false,
      message:"Error",
      data:[]
    })
  } 
})
/**
 * @swagger
 * /delete/:id:
 *  delete: 
 *        summary: this api is used to delete user
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
      data:data
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