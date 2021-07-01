const mongoose=require('mongoose');
const Course=require('./Course');

const fieldSchema=mongoose.Schema({
    name: { type: String, require:true,unique:true},
},{ timestamps: true,toJSON:{virtuals:true} });

fieldSchema.virtual('courses',{
    ref:'Course',
    localField:'_id',
    foreignField:'fieldId',
});

fieldSchema.statics.getFields=async function(){
    return await Field.find({},'-__v -updatedAt')
    .populate('courses','-__v -updatedAt')
}

fieldSchema.statics.getFieldData=async function(Id){
    if(!mongoose.isValidObjectId(Id))
        throw new Error('not valid id')
    else
        return await Field.findById(Id,'-__v -updatedAt')
        .populate('courses','-__v -updatedAt')
}

const Field =mongoose.model('Field',fieldSchema);;

module.exports= Field;