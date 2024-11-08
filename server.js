const express = require('express');
const mongoose = require('mongoose');
var createError=require('http-errors')
const app = express();
app.use(express.json());

const pathConfig=require('./path.js');
global.__base=__dirname+'/';
global.__path_app=__base+pathConfig.folder_app+'/';

global.__path_config=__path_app+pathConfig.folder_config+'/';
global.__path_models=__path_app+pathConfig.folder_models+'/';
global.__path_routers=__path_app+pathConfig.folder_routes+'/';
global.__path_schemas=__path_app+pathConfig.folder_schemas+'/';

const systemConfig=require(__path_config+'system');
const databaseConfig=require(__path_config+'database');

app.locals.systemConfig=systemConfig;
var uri=`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.qskjs.mongodb.net/${databaseConfig.database}`;
// Kết nối MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.log(err));
// Sử dụng route xác thực
app.get('/',(req,res)=>{
    res.send("welcome")
})
app.use('/api/user/',require(__path_routers));
console.log(systemConfig.PORT);
app.listen(systemConfig.PORT, () => console.log(`Server running on port ${systemConfig.PORT}`));


