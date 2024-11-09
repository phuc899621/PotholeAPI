const mongoose=require('mongoose');
const databaseConfig=require(__path_config+'database');
//noi tao ra du lieu
var schema=new mongoose.Schema({
    id:String,
    username:{ type: String, unique: true },
    email:{type: String,unique:true},
    name:String,
    password:String
});
module.exports=mongoose.model(databaseConfig.col_items,schema);