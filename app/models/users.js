const { username } = require("../config/database");

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
            return MainModel.findOne({username:param.username}).select('id email username name');
        }
        if(option.task=='login'){
            return MainModel.findOne({username:param.username}).select('id email name username password');
        }
        if(option.task=='registerEmail'){
            return MainModel.findOne({email: param.email }).select('id email name username email password');
        }
        if(option.task=='registerUsername'){
            return MainModel.findOne({username: param.username }).select('id email name username email password');
        }
        if(option.task=='resetPassword'){
            return MainModel.findOne({email:param.email}).select("id email name username password");
        }
        if(option.task=='edit'){
            return MainModel.findOne({email:param.email}).select('id name email username password');
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
            return MainModel.updateOne({email:param.email},param.body);
        }
        if(option.task=='password'){
            return MainModel.updateOne({email:param.email},{ $set:{ password: param.password}});
        }
        
    },
    

}