const controller = require('../../../controller');
const User=require('../../../../../models/User');

class ProfileController extends controller {
    async getUserData(req,res,next){
        return this.success(await User.getUserData(req.user.id),res)
    }

    async updateUser(req,res){
        const errs = this.validationData(req)
        if(errs.length>0)
            return this.failed(errs,res,400);
        console.log('update')
        // const {user:{id,username},body} = req;
        // if(body.username&&body.username!== username){
        //     var found = await User.findOne({username:body.username});
        // }
        // if(found) return this.failed('username has been taken before',res)
        // User.findById(id)
        // .then(user=>
        //     user.updateOne({$set:body})
        //     .then(()=>this.success('user successfuly updated',res))
        //     .catch(err=>this.failed(err,res))
        // )
        // .catch(err=>this.failed(err,res))
    }
}   


module.exports = new ProfileController();