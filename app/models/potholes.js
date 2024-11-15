const PotholeModel = require(__path_schemas+'potholes');
module.exports={
    //them 1 pothole
    addPothole: async (data) => {
      return await new PotholeModel(data).save(); 
      },
    
      // lay tat ca pothole
      listPotholes: async (param,option) => {
        if(option.task=="all"){
          return await Pothole.find().populate('reportedBy', 'username');
        }
        if(option.task=='reportedBy'){
          return await Pothole.find
        }
        
      },
    
      // lay pothole theo id
      getPotholeById: async (id) => {
        return await Pothole.findById(id).populate('reportedBy', 'username');
      },
}