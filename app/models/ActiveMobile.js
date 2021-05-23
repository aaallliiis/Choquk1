const mongoose=require('mongoose');


const activeMobileShcema=mongoose.Schema({
    phoneNumber:{ type:String , require:true },
    used:{ type:Boolean , default:false},
    token:{ type:Number , require:true},
},{ timestamps: true });

module.exports = mongoose.model('ActiveMobile',activeMobileShcema);

