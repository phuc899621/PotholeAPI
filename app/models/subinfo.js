const SubinfoModel = require(__path_schemas+'subinfo');
module.exports={
    //them 1 subinfo
    create:(item)=>{
        return new SubinfoModel(item).save();
    },
    update:async (param,option)=>{
        if(option.task=='oneReport'){
            return await SubinfoModel.updateOne({
                userID:param.reportedBy
            },{
                $inc: { totalReport: 1 }
            })
        }
        if(option.task=='allReport'){
            return await SubinfoModel.updateOne({
                userID:param.reportedBy
            },{
                $set: { totalReport: param.totalReport }
            })
        }
        if(option.task=='distance'){
            return await SubinfoModel.updateOne({
                userID:param._id
            },{
                $set: { totalDistances: param.totalDistances}
            })
        }
    },
    listSubinfo:async(param,option)=>{
        if(option.task=='one'){
            return SubinfoModel.findOne({userID:param.userID});
        }
        if(option.task=='ranking'){
            const subinfos= await SubinfoModel.find({})
            .populate('userID',"username")
            .sort({totalReport: -1})
            .limit(10);
            const newSubinfo =await subinfos.map(subinfo => {
                return {
                    username:subinfo.userID.username,
                    totalReport:subinfo.totalReport
                }
              });  
            return newSubinfo;
        }

    

    }
}