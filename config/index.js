const database=require('./dataBase');
const fileStorage=require('./fileStorage');
const path=require('path');

module.exports={  
    port:process.env.PORT,
    database,
    filePath:path.join(__dirname,'../app/public/files'),
    fileStorage,
    jwt_secretOrKey:process.env.JWTSECRETORKEY
}