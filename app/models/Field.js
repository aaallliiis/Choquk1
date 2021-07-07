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
        throw new Error('invalid id')
    else
        return await Field.findById(Id,'-__v -updatedAt')
        .populate('courses','-__v -updatedAt')
}

fieldSchema.statics.updateField=async function(body,id){
    const found = await Field.findOne({name:body.name})
    if(found){
        throw new Error('name duplicated')
    }
    if(!mongoose.isValidObjectId(id))
        throw new Error('invalid id')
    else{
        await Field.findByIdAndUpdate(id,{$set:body})
        return 'field successfuly updated'
    }
}

fieldSchema.statics.deleteField=async function(id){
    const found = await Field.findById(id)
    if(!found||!mongoose.isValidObjectId(id))
        throw new Error('invalid id')
    else{
        await Course.deleteMany({fieldId:found});
        await found.deleteOne();
        return 'field successfuly deleted'
    }
}

const Field =mongoose.model('Field',fieldSchema);;

module.exports= Field;