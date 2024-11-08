// routes/auth.js
var express = require('express');
var router = express.Router(); // Đảm bảo router đã được tạo đúng cách

const controllerName='users'
const MainModel=require(__path_models+controllerName)

router.get('/',(req,res,next)=>{
  res.send('all users');
})
router.get('/:id',(req,res,next)=>{
  res.send('user wtih id: '+req.params.id);
})
//dung async de cho doi thuc hien
router.post('/add', async (req,res,next)=>{
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
})
router.put('/edit/:id',(req,res)=>{
  res.send('edit user with id'+req.params.id);
})
router.delete('/delete/:id',(req,res)=>{
  res.send('delete user with id'+req.params.id);
})
module.exports = router; // Đảm bảo export router đúng cách

//tao id ngau nhien
makeId=(number)=>{
  let text="";
  let possible="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  for(let i=0;i<number;i++) text+=possible.charAt(Math.floor(Math.random()*possible.length));
  return text;
}