const mongoose=require('mongoose');
const databaseConfig=require(__path_config+'database');
//noi tao ra du lieu
var userSchema=new mongoose.Schema({
    id:String,
    username:{ type: String, unique: true },
    email:{type: String,unique:true},
    name:String,
    password:String,
    image:Buffer 
});
module.exports=mongoose.model(databaseConfig.col_items_users,userSchema);