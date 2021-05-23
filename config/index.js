const database=require('./dataBase');

module.exports={  
    port:process.env.PORT,
    database,
    jwt_secretOrKey:process.env.JWTSECRETORKEY
}