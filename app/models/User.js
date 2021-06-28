const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema({
    name: { type: String, default:null},
    lastName: { type: String, default:null},
    email: { type: String, default:null},
    password: { type: String, required: true },
    phoneNumber: { type: String, default:null},
    uniCode: { type: String, default:null},
    orientation: { type: String, default:null},
    field: { type: String, default:null},
    birthDate: { type: Date, default:null},
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
    this.getUpdate().$set.password = bcrypt.hashSync(this.getUpdate().$set.password, salt);
    next();
});

userSchema.statics.getUserData=async function(Id){
    return await User.findById(Id,'-password -__v')
}

userSchema.statics.rehash=function(password,hash){
    return bcrypt.compareSync(password,hash);
}

const User = mongoose.model('User',userSchema);

module.exports=User;
