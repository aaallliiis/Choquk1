const passport=require('passport');
const passportJWT = require('passport-jwt');
const User=require('../models/User');
const Admin=require('../models/Admin');
const ExtractJWT=passportJWT.ExtractJwt;
const JWTStrategy=passportJWT.Strategy;

passport.use('jwt',new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.jwt_secretOrKey
},async (jwtPayload,done)=>{
    try{
        let user =await User.findById(jwtPayload.id);
        if(user) done(null,user);
        else done(null,false);
    }
    catch(err){
        done(err,false);
    }
}))


passport.use('admin-jwt',new JWTStrategy({
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.jwt_secretOrKey
},async (jwtPayload,done)=>{
    try{
        let admin =await Admin.findById(jwtPayload.id);
        if(admin) done(null,admin);
        else done(null,false);
    }
    catch(err){
        done(err,false);
    }
}))