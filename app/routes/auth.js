// routes/auth.js
var express = require('express');
var router = express.Router(); // Đảm bảo router đã được tạo đúng cách

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
    res.status(400).json({success:false})
  }
})


//lay 1 user co id
/**
 * @swagger
 * /:id:
 *  get: 
 *        summary: this api is used to get one user with id
 *        description: this api is used to get one user with id
 *        responses:
 *          201: 
 *              description: To get one user
 *          400:
 *              description: Failed
 */
router.get('/:id',async (req,res,next)=>{
  try{
    //dat dieu kien task=one thi lay 1
    const data=await MainModel.listUsers({'id':req.params .id},{'task':'one'})
    res.status(201).json({
    success:true,
    data:data
    })
  }catch{
    res.status(400).json({success:false})
  }
})


//dung async de cho doi thuc hien
//them vao 1 item
/**
 * @swagger
 * /add:
 *  post: 
 *        summary: this api is used to add one user with username, name, password
 *        description: this api is used to add one user with username, name, password
 *        responses:
 *          201: 
 *              description: To add user
 *          400:
 *              description: Failed
 */
router.post('/add', async (req,res,next)=>{
  try{
    let param=[];
    param.id=makeId(8);
    param.username=req.body.username;
    param.name=req.body.name;
    param.password=req.body.password

    //can tao phuong thuc create o models/users
    const data=await MainModel.create(param);

    //neu luu thanh cong thi in ra thong bao
    res.status(201).json({
      success:true,
      data:data
    });
  }catch{
    res.status(400).json({success:false})
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
    res.status(400).json({success:false})
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
    res.status(400).json({success:false})
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