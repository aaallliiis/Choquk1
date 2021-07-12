const mongoose=require('mongoose');
const File=require('./File');

const courseSchema=mongoose.Schema({
    name: { type: String, default:null},
    profId: { type: mongoose.Schema.Types.ObjectId,ref:'Prof' },
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
},{ timestamps: true });

courseSchema.statics.createCourse=async function(body){
    const found = await Course.findOne({name:body.name})
    if(found){
        throw new Error('name duplicated')
    }
    if(!mongoose.isValidObjectId(body.fieldId))
        throw new Error('invalid id')
    else{
        const newCourse =new Course(body)
        await newCourse.save();
        return 'course successfuly created'
    }
}

courseSchema.statics.updateCourse=async function(body,id){
    const found = await Course.findOne({name:body.name})
    if(found){
        throw new Error('name duplicated')
    }
    if(!mongoose.isValidObjectId(body.fieldId)||!mongoose.isValidObjectId(id))
        throw new Error('invalid id')
    else{
        await Course.findByIdAndUpdate(id,{$set:body})
        return 'course successfuly updated'
    }
}

courseSchema.statics.deleteCourse=async function(id){
    const found = await Course.findById(id)
    if(!found||!mongoose.isValidObjectId(id))
        throw new Error('invalid id')
    else{
        await File.deleteMany({courseId:found});
        await found.deleteOne();
        return 'course successfuly deleted'
    }
}

const Course = mongoose.model('Course',courseSchema);

module.exports=Course;
