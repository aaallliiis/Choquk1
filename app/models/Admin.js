const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const adminSchema=mongoose.Schema({
    username: { type: String,unique:true},
    password: { type: String, required: true },
},{ timestamps: true });

adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        let salt=bcrypt.genSaltSync(15);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
});

adminSchema.pre('findOneAndUpdate', function(next){
    const salt = bcrypt.genSaltSync(15);
    if(this.getUpdate().$set.password)
        this.getUpdate().$set.password = bcrypt.hashSync(this.getUpdate().$set.password, salt);
    next();
});

adminSchema.statics.rehash=function(password,hash){
    return bcrypt.compareSync(password,hash);
}

const Admin = mongoose.model('Admin',adminSchema);

module.exports=Admin;
