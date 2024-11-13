const express = require('express');
const mongoose = require('mongoose');
var createError=require('http-errors');
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');

const app = express();
app.use(express.json());

//Tao duong dan va cau hinh
const pathConfig=require('./path.js');
global.__base=__dirname+'/';
global.__path_app=__base+pathConfig.folder_app+'/';
global.__path_config=__path_app+pathConfig.folder_config+'/';
global.__path_models=__path_app+pathConfig.folder_models+'/';
global.__path_routers=__path_app+pathConfig.folder_routes+'/';
global.__path_schemas=__path_app+pathConfig.folder_schemas+'/';

const systemConfig=require(__path_config+'system');
const databaseConfig=require(__path_config+'database');
const PORT=systemConfig.PORT;
app.locals.systemConfig=systemConfig;

//Khoi tao swagger
const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:"Pothole App API",
            version:'1.0.0'
        },
        servers:[{
                url:`http://${systemConfig.server}:${PORT}/api`
            }
        ]
    },
    apis:[__path_routers+"/*.js"]
}
const swaggerSpec=swaggerJsDoc(options);
app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));

var uri=`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.qskjs.mongodb.net/${databaseConfig.database}`;
// Kết nối MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => console.log(err));


//Goi den route /
app.use('/api',require(__path_routers));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


