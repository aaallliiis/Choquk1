const mongoose=require('mongoose');

const fileShcema=mongoose.Schema({
    title:{ type:String , require:true },
    description:{ type:String , require:true },
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
    courseId: { type: mongoose.Schema.Types.ObjectId,ref:'Course' },
    url:{ type:String , require:true },
    type:{ type:String , require:true },
},{ timestamps: true });

fileShcema.statics.getFiles=async function({search,courseId,fieldId,profId}){
    let query = [];
    let founds = [];
    
    if(search)
        query = [{title:new RegExp(search,'gi')},{description:new RegExp(search,'gi')}]

    console.log(profId)
    if(fieldId&&fieldId.length>0)
        query.push({fieldId:{ "$in" : fieldId}})

    if(courseId&&courseId.length>0)
        query.push({courseId:{ "$in" : courseId}})

    if(query.length>0)
        founds = await File.find({$or:query},'-__v -updatedAt')
        .populate({path:'courseId',select:'name',populate:[{path:'profId',select:'name',model:'Prof'}]})
        .populate('fieldId','_id name')
    else
        founds = await File.find({},'-__v -updatedAt')
        .populate({path:'courseId',select:'name',populate:[{path:'profId',select:'name',model:'Prof'}]})
        .populate('fieldId','_id name')
    if(profId&&
        mongoose.isValidObjectId(profId)&&
        await mongoose.model('Prof').findById(profId)
    )
        return founds.filter(({courseId:{profId:{_id}}})=>_id.toString()===profId);
    else if(profId&&
        (!mongoose.isValidObjectId(profId)||
        !(await mongoose.model('Prof').findById(profId)))
    )
        throw new Error('آیدی نامعتبر است')    
    else if(!profId)
        return founds;
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

