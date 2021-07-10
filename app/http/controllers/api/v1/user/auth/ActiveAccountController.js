const controller = require('../../../../controller');
const ActiveMobile = require('../../../../../../models/ActiveMobile');
const User = require('../../../../../../models/User');

class ActiveAccountController extends controller {
    async sendToken(req,res){
        const {body:{phoneNumber}}=req;
        User.findOne({phoneNumber})
        .then(async user=>{
            if(!user) throw new Error('this phone number has not been registered')
            if(user.active) throw new Error('this phone number has been activated')
            const newActive = new ActiveMobile({
                phoneNumber,
                token:this.generateToken()
            })
            await newActive.save()
            .then(ref=>{
                this.sendCode(ref,res)
            })
            .catch(err=>this.failed(err.message,res)); 
        })
        .catch(({message})=>this.failed(message,res))
    }

    async activeMobile(req,res){
        const {body:{token,phoneNumber}} =req;
        ActiveMobile.findOne({phoneNumber,token})
        .then(active=>{
            if(!active||active.used)throw new Error('unvalid token or phone number');
            User.findOne({phoneNumber})
            .then(user=>{
                user.active=true;
                user.save()
                .then(newUser=>{
                    active.updateOne({$set:{used:true}})
                    .then(act=>this.success('Activated',res))
                })
                .catch(err=>this.failed(err,res))
            })
            .catch(err=>this.failed(err.message,res))
        })
        .catch(err=>this.failed(err.message,res))
    }
}   


module.exports = new ActiveAccountController();