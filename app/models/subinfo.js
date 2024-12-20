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
                $inc: { totalDistances: param.totalDistances}
            })
        }
    },
    listSubinfo:(param,option)=>{
        if(option.task=='one'){
            return SubinfoModel.findOne({userID:param.userID});
        }
    }
}