const controller = require('../../../../controller');
const passport=require('passport');
const jwt=require('jsonwebtoken');

class AuthController extends controller {
    async login(req,res){
        passport.authenticate('local.login',(err,user,info)=>{
            if(err) return this.failed(err.message,res);
            if(!user) return this.failed(info.message,res,404);
            if(!user.active) return this.failed("user is deactive pls verify your phone number",res,404);
            req.logIn(user,async err=>{
                if(err) return this.failed(err.message,res);
                const token=jwt.sign({id:user.id},config.jwt_secretOrKey,{expiresIn:60*60*24});
                this.success(token,res);
            })
        })(req,res) 
    }
    
    async register(req,res,next){
        passport.authenticate('local.register',(err,user,info)=>{
            if(err) return this.failed(err.message,res);
            if(!user) return this.failed(info.message,res,400);
            req.logIn(user,err=>{
                if(err) return this.failed(err.message,res);
                this.success('user registered successfully',res);
            })
        })(req,res,next)
    }
}   


module.exports = new AuthController();