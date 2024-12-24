const ReportModel = require(__path_schemas+'potholes');
module.exports={
    //them 1 pothole
    addReport: async (data) => {
      return await new ReportModel(data).save(); 
    },
}