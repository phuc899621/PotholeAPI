const MainModel = require(__path_schemas+'users');

module.exports={
    //tra danh sach du lieu
    listUsers:(param,option)=>{
        if(option.task=='all'){
            //tra ve du lieu id username name status
            return MainModel.find({}).select('id email username name password');
        }
        if(option.task=='one'){
            //tra ve du lieu cua 1 user cu the
            return MainModel.findOne({username:param.username}).select('id email username name password');
        }
        if(option.task=='login'){
            return MainModel.findOne({username:param.username}).select('id email name username password');
        }
        if(option.task=='register'){
            return MainModel.findOne({email:param.email}).select('id email name username email password');
        }
    },
    //luu lai tren data base
    create:(item)=>{
        return new MainModel(item).save();
    },
    deleteUser:(param,option)=>{
        if(option.task=='one'){
            //tra ve du lieu cua 1 user cu the
            return MainModel.deleteOne({id:param.id})
        }
    },
    editUser:(param,option)=>{
        if(option.task=='edit'){
            return MainModel.updateOne({id:param.id},param.body)
        }
    },
    

}