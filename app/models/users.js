const MainModel = require(__path_schemas+'users');

module.exports={
    //luu lai tren data base
    create:(item)=>{
        return new MainModel(item).save();
    }
}