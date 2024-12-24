  const mongoose=require('mongoose');
  const databaseConfig=require(__path_config+'database');
  const moment = require('moment-timezone');
  function getVietnamTime() {
    const now = new Date();
    now.setHours(now.getHours() + 7); // Thêm 7 giờ vào thời gian hiện tại
    return now;
  }
  //noi tao ra du lieu
  var reportSchemas=new mongoose.Schema({
      reportedInfo:{ type: mongoose.Schema.Types.ObjectId, ref: 'potholes' },
      reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      description: { type: String, default: ""},

  });
  module.exports=mongoose.model(databaseConfig.col_items_report,reportSchemas);