const mongoose=require('mongoose');
const databaseConfig=require(__path_config+'database');
//noi tao ra du lieu
var potholeSchema=new mongoose.Schema({
    location: {
        type: { type: String, default: 'Point' }, 
        coordinates: { type: [Number], required: true } // lưu [longitude, latitude]
      },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    reportedAt: { type: Date, default: Date.now },
});
module.exports=mongoose.model(databaseConfig.col_items_potholes,potholeSchema);