const mongoose=require('mongoose');

const orientationSchema=mongoose.Schema({
    name: { type: String, require:true,unique:true},
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
},{ timestamps: true,toJSON:{virtuals:true} });

orientationSchema.statics.getOrientations=async function(fieldId){
    return await Orientation.find({fieldId},'-__v -updatedAt')
}

const Orientation = mongoose.model('Orientation',orientationSchema);

module.exports= Orientation;