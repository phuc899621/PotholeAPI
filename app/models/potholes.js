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
        const potholes= await PotholeModel.find().populate('reportedBy',"username name image email");
        const newPotholes =await potholes.map(pothole => {
          return {
              reportedBy: {
                  image: pothole.reportedBy.image.toString('base64'),
                  username: pothole.reportedBy.username,
                  name: pothole.reportedBy.name,
                  email:pothole.reportedBy.email,
              },
              image:pothole.image.toString('base64'),
              location: pothole.location,
              severity:pothole.serveity,
              status:pothole.status,
              reportedAt:pothole.reportedAt
          }});
          return newPotholes;
        
      }
      if(option.task=='id'){        
        const potholes =await PotholeModel.find({reportedBy:param._id}).populate('reportedBy',"username name image email");
        const newPotholes =await potholes.map(pothole => {
          return {
              reportedBy: {
                  image: pothole.reportedBy.image.toString('base64'),
                  username: pothole.reportedBy.username,
                  name: pothole.reportedBy.name,
                  email:pothole.reportedBy.email,
              },
              image:pothole.image.toString('base64'),
              location: pothole.location,
              severity:pothole.serveity,
              status:pothole.status,
              reportedAt:pothole.reportedAt
          };
      });  
        return newPotholes;
      }
    },
  
    // lay pothole theo id
    getPotholeById: async (id) => {
      return await PotholeModel.findById(id).populate('reportedBy', 'username');
    }
}