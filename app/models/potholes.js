const PotholeModel = require(__path_schemas+'potholes');
module.exports={
    //them 1 pothole
    addPothole: async (data) => {
      return await new PotholeModel(data).save(); 
    },
    
    // lay tat ca pothole cua 1 nguoi
    //pothole(reportedby)
    listPotholes: async (param,option) => {
      if(option.task=="all"){
        return await PotholeModel.find();
      }
      if(option.task=='reportedBy'){        
          return await PotholeModel.find({reportedBy:param._id}).populate('reportedBy');
      }
        
    },
  
    // lay pothole theo id
    getPotholeById: async (id) => {
      return await PotholeModel.findById(id).populate('reportedBy', 'username');
    }
}