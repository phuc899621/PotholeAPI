const MainModel = require(__path_schemas+'potholes');
module.exports={
    //them 1 pothole
    addPothole: async (data) => {
        try {
          const newPothole = new Pothole(data);
          return await newPothole.save();  // Lưu vào database
        } catch (err) {
          throw new Error('Error adding pothole: ' + err.message);
        }
      },
    
      // lay tat ca pothole
      listPotholes: async () => {
        return await Pothole.find().populate('reportedBy', 'username');
      },
    
      // lay pothole theo id
      getPotholeById: async (id) => {
        return await Pothole.findById(id).populate('reportedBy', 'username');
      },
}