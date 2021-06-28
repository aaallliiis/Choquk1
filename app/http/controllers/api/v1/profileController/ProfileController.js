const controller = require('../../../controller');
const User=require('../../../../../models/User');

class ProfileController extends controller {
    async getUserData(req,res,next){
        return this.success(await User.getUserData(req.user.id),res)
    }

    async updateUser({user:{id},body},res){
        const {phoneNumber,email,uniCode,active} = body;
        if(phoneNumber||email||uniCode){
            var found = await User.findOne({$or: [
                {email},
                {phoneNumber},
                {uniCode}
            ]});
            if(found) return this.failed('email or phonenumber or uniCode has been taken before',res)
        }
        delete body.active
        User.findByIdAndUpdate(id,{$set:body})
        .then(()=>this.success('user successfuly updated',res))
        .catch(err=>console.log(err))
    }
}   


module.exports = new ProfileController();