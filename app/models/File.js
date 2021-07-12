const mongoose=require('mongoose');

const fileShcema=mongoose.Schema({
    title:{ type:String , require:true },
    description:{ type:String , require:true },
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
    courseId: { type: mongoose.Schema.Types.ObjectId,ref:'Course' },
    url:{ type:String , require:true },
    type:{ type:String , require:true },
},{ timestamps: true });

fileShcema.statics.getFiles=async function({search,fieldId,courseId,profId}){
    let query = [];
    
    if(search)
        query = [{title:new RegExp(search,'gi')},{description:new RegExp(search,'gi')}]
    
    if(fieldId&&
        mongoose.isValidObjectId(fieldId)&&
        await mongoose.model('Field').findById(fieldId)
    )
        query.push({fieldId})
    else if(fieldId&&
        (!mongoose.isValidObjectId(fieldId)||
        !(await mongoose.model('Field').findById(fieldId)))
    )
        throw new Error('آیدی نامعتبر است')

    if(courseId&&
        mongoose.isValidObjectId(courseId)&&
        await mongoose.model('Course').findById(courseId)
    )
        query.push({courseId})
    else if(courseId&&
        (!mongoose.isValidObjectId(courseId)||
        !(await mongoose.model('Course').findById(courseId)))
    )
        throw new Error('آیدی نامعتبر است')

    if(profId&&
        mongoose.isValidObjectId(profId)&&
        await mongoose.model('Prof').findById(profId)
    )
        query.push({courseId:{profId}})
    else if(profId&&
        (!mongoose.isValidObjectId(profId)||
        !(await mongoose.model('Prof').findById(profId)))
    )
        throw new Error('آیدی نامعتبر است')


    if(query.length>0)
        return await File.find({$or:query},'-__v -updatedAt')
        .populate('courseId','_id name profId')
        .populate('courseId.profId','_id name')
        .populate('fieldId','_id name')
    else
        return await File.find({},'-__v -updatedAt')
        .populate('courseId','_id name profId')
        .populate('courseId.profId','_id name')
        .populate('fieldId','_id name')
}

fileShcema.statics.getFileData=async function(Id){
    if(!mongoose.isValidObjectId(Id))
        throw new Error('آیدی نامعتبر است')
    else
        return await File.findById(Id,'-__v -updatedAt')
        .populate('courseId','_id name')
        .populate('fieldId','_id name')
}

fileShcema.statics.createFile=async function(body){
    if(!(await mongoose.model('Field').findById(body.fieldId))||
        !(await mongoose.model('Course').findById(body.courseId))||
        !mongoose.isValidObjectId(body.fieldId)||
        !mongoose.isValidObjectId(body.courseId)
    )
        throw new Error('آیدی نامعتبر است')
    else{
        const newFile =new File(body)
        await newFile.save();
        return 'فایل با موفقیت اضافه شد'
    }
}

fileShcema.statics.deleteFile=async function(id){
    const found = await File.findById(id)
    if(!found||!mongoose.isValidObjectId(id))
        throw new Error('آیدی نامعتبر است')
    else{
        await found.deleteOne();
        return 'فایل با موفقیت حذف شد'
    }
}

const File = mongoose.model('File',fileShcema);

module.exports = File;

