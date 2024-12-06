var express = require('express');
var router = express.Router(); 
const bcrypt = require('bcryptjs');
const MainModel=require(__path_models+'users');
const PotHoleModel=require(__path_models+'potholes');

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



//dang nhap
/**
 * @swagger
 * /auth/login:
 *  post: 
 *        summary: Login with username and password
 *        description: Login with username and password
 *        responses:
 *          200: 
 *              description: login success
 *          404:
 *              description: Username not found
 *          401:
 *              description: Wrong password
 *          500:
 *              description: Server error
 */
router.post('/login',async (req,res,next)=>{
  try{

    const username=req.body.username;
    const passwordNonHash=req.body.password;
    const data=await MainModel.listUsers({'username':username},{'task':'username'});
    
    if(!data){
      return res.status(404).json({
        success:false,
        message:'Username not found',
        data:[]
      })
    }
    //kiem tra password
    const storedPassword=data.password;
    const isMatch=await bcrypt.compare(passwordNonHash,storedPassword); 
    if(isMatch){
      return res.status(200).json({
          success:true,
          message:'',
          data:[data]
      });
    }  
    res.status(401).json({
          success:false,
          message:'Wrong Password',
          data:[]
    }) 
  }catch{
    res.status(500).json({
      success:false,
      message:'Server error',
      data:[]
    })
  }
})




/**
 * @swagger
 * /auth/register:
 *  post: 
 *        summary: Add new user to database
 *        description: Add new user to database
 *        responses:
 *          201: 
 *              description: add successfully
 *          400:
 *              description: Missing required fields
 *          500:
 *              description: Error create new user
 */
router.post('/register', async (req,res,next)=>{
  const { username, password, email,name } = req.body;
  if (!username || !password || !email|| !name) {
    return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        data: []
    });
  }
  let param=[];
  param.id=makeId(8);
  param.username=req.body.username;
  param.name=req.body.name;
  param.email=req.body.email;
  param.password=await bcrypt.hash(req.body.password,10);
  const data=await MainModel.create(param);
  if(!data){
    return res.status(500).json({
      success:false,
      message:"Error create new user",
      data:[]
      });
  }
  return res.status(201).json({
    success:true,
    message:'',
    data:[]
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