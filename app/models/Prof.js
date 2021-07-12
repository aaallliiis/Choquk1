const mongoose=require('mongoose');
const Course = require('./Course');

const ProfSchema=mongoose.Schema({
    name: { type: String, require:true,unique:true},
},{ timestamps: true,toJSON:{virtuals:true} });

ProfSchema.virtual('courses',{
    ref:'Course',
    localField:'_id',
    foreignField:'profId',
});

ProfSchema.statics.getProfs=async function(){
    return await Prof.find({},'-__v -updatedAt')
    .populate('courses','-__v -updatedAt')
}

ProfSchema.statics.getProfData=async function(Id){
    if(!mongoose.isValidObjectId(Id))
        throw new Error('آیدی نامعتبر است')
    else
        return await Prof.findById(Id,'-__v -updatedAt')
        .populate('courses','-__v -updatedAt')
}

ProfSchema.statics.updateProf=async function(body,id){
    const found = await Prof.findOne({name:body.name})
    if(found){
        throw new Error('نام تکراری میباشد')
    }
    if(!mongoose.isValidObjectId(id)||!(await Prof.findById(id)))
        throw new Error('آیدی نامعتبر است')
    else{
        await Prof.findByIdAndUpdate(id,{$set:body})
        return 'اطلاعات استاد با موفقیت ویرایش شد'
    }
}

ProfSchema.statics.deleteProf=async function(id){
    const found = await Prof.findById(id)
    if(!found||!mongoose.isValidObjectId(id))
        throw new Error('آیدی نامعتبر است')
    else{
        await Course.deleteMany({profId:found});
        await found.deleteOne();
        return 'استاد با موفقیت حذف شد'
    }
}

const Prof =mongoose.model('Prof',ProfSchema);;

module.exports= Prof;