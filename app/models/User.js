const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const Orientation = require('./Orientation');

const userSchema=mongoose.Schema({
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String,required: true,unique:true},
    password: { type: String, required: true },
    phoneNumber: { type: String,required: true,unique:true},
    uniCode: { type: String,required: true,unique:true},
    orientation: { type: mongoose.Schema.Types.ObjectId,ref:'Orientation' },
    field: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
    active: { type: Boolean, default:false},
},{ timestamps: true });

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        let salt=bcrypt.genSaltSync(15);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
});

userSchema.pre('findOneAndUpdate', function(next){
    const salt = bcrypt.genSaltSync(15);
    if(this.getUpdate().$set.password)
        this.getUpdate().$set.password = bcrypt.hashSync(this.getUpdate().$set.password, salt);
    next();
});

userSchema.statics.getUserData=async function(Id){
    if(!mongoose.isValidObjectId(Id))
        throw new Error('آیدی نامعتبر است')
    else
        return await User.findById(Id,'-password -__v')
}

userSchema.statics.rehash=function(password,hash){
    return bcrypt.compareSync(password,hash);
}

const User = mongoose.model('User',userSchema);

module.exports=User;
