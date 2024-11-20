  const mongoose=require('mongoose');
  const databaseConfig=require(__path_config+'database');
  const moment = require('moment-timezone');
  function getVietnamTime() {
    const now = new Date();
    now.setHours(now.getHours() + 7); // Thêm 7 giờ vào thời gian hiện tại
    return now;
  }
  //noi tao ra du lieu
  var potholeSchema=new mongoose.Schema({
      location: {
          type: { type: String, default: 'Point' }, 
          coordinates: { type: [Number], required: true }
        },
      reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      reportedAt: { type: Date, default:getVietnamTime}, 
      image:{type: Buffer, 
        default: Buffer.from('') },
      severity: { type: String, required: true },
      status: { type: String, default: "not_fixed"},

  });
  module.exports=mongoose.model(databaseConfig.col_items_potholes,potholeSchema);