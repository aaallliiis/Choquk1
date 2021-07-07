const controller = require('../../../../controller');
const passport=require('passport');
const jwt=require('jsonwebtoken');

class AuthController extends controller {
    async login(req,res){
        passport.authenticate('local.admin',(err,admin,info)=>{
            if(err) return this.failed(err.message,res);
            if(!admin) return this.failed(info.message,res,404);
            req.logIn(admin,async err=>{
                if(err) return this.failed(err.message,res);
                const token=jwt.sign({id:admin.id},config.jwt_secretOrKey,{expiresIn:60*60*24});
                this.success(token,res);
            })
        })(req,res) 
    }
}   


module.exports = new AuthController();