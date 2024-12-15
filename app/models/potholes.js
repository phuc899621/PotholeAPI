const PotholeModel = require(__path_schemas+'potholes');
const Subinfo = require(__path_models+'subinfo')
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
              severity:pothole.severity,
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
              severity:pothole.severity,
              status:pothole.status,
              reportedAt:pothole.reportedAt
          };
        });  
          return newPotholes;
      }
      if(option.task=='count'){        
          return PotholeModel.countDocuments({reportedBy:param._id});
      }
      if(option.task=='severity_small'){        
        return PotholeModel.countDocuments({severity:'small'});
      }
      if(option.task=='severity_medium'){        
        return PotholeModel.countDocuments({severity:'meidum'});
      }
      if(option.task=='severity_large'){        
        return PotholeModel.countDocuments({severity:'large'});
      }
      if(option.task=='severity_all'){        
        return PotholeModel.countDocuments();
      }
      if(option.task=="year"){
        return PotholeModel.countDocuments({
          reportedAt:{$gte:param.monthStart,$lt:param.monthEnd}
        })
      }
      if(option.task=="year_fixed"){
        return PotholeModel.countDocuments({
          reportedAt:{$gte:param.monthStart,$lt:param.monthEnd},
          status: "fixed"
        })
      }
    },
  
    // lay pothole theo id
    getPotholeById: async (id) => {
      return await PotholeModel.findById(id).populate('reportedBy', 'username');
    }
}