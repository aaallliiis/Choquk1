const controller = require('../../../../controller');
const passport=require('passport');
const jwt=require('jsonwebtoken');

class AuthController extends controller {
    async login(req,res){
        passport.authenticate('local.login',(err,user,info)=>{
            if(err) return this.failed(err.message,res);
            if(!user) return this.failed(info.message,res,404);
            if(!user.active) return this.failed("حساب کاربری فعال نمیباشد لطفا حساب خود را فعال کنید",res,404);
            req.logIn(user,async err=>{
                if(err) return this.failed(err.message,res);
                const token=jwt.sign({id:user.id},config.jwt_secretOrKey,{expiresIn:60*60*24});
                this.success(token,res);
            })
        })(req,res) 
    }
    
    async register(req,res,next){
        const errors = this.validationData(req);
        if(errors.length > 0)
            return this.failed(errors,res,400);
        passport.authenticate('local.register',(err,user,info)=>{
            if(err) return this.failed(err.message,res);
            if(!user) return this.failed(info.message,res,400);
            req.logIn(user,err=>{
                if(err) return this.failed(err.message,res);
                this.success('ثبت نام با موفقیت انجام شد',res);
            })
        })(req,res,next)
    }
}   


module.exports = new AuthController();