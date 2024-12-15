const mongoose=require('mongoose');
const databaseConfig=require(__path_config+'database');
//noi tao ra du lieu
var subinfoSchema=new mongoose.Schema({
    totalDistances:{type:Number, default:0},
    totalReport:{type:Number,default:0},
    totalFixedPothole:{type:Number,default:0},
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },

});
module.exports=mongoose.model(databaseConfig.col_items_subinfo,subinfoSchema);