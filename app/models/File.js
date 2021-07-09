const mongoose=require('mongoose');

const fileShcema=mongoose.Schema({
    title:{ type:String , require:true },
    description:{ type:String , require:true },
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
    courseId: { type: mongoose.Schema.Types.ObjectId,ref:'Course' },
    url:{ type:String , require:true },
    type:{ type:String , require:true },
},{ timestamps: true });

fileShcema.statics.getFiles=async function({search,fieldId,courseId}){
    let query = [];
    
    if(search)
        query = [{title:new RegExp(search,'gi')},{description:new RegExp(search,'gi')}]
    
    if(fieldId&&mongoose.isValidObjectId(fieldId))
        query.push({fieldId})
    else if(fieldId&&!mongoose.isValidObjectId(fieldId))
        throw new Error('invalid id')

    if(courseId&&mongoose.isValidObjectId(courseId))
        query.push({courseId})
    else if(courseId&&!mongoose.isValidObjectId(courseId))
        throw new Error('invalid id')

    if(query.length>0)
        return await File.find({$or:query},'-__v -updatedAt')
        .populate('courseId','_id name')
        .populate('fieldId','_id name')
    else
        return await File.find({},'-__v -updatedAt')
        .populate('courseId','_id name')
        .populate('fieldId','_id name')
}

fileShcema.statics.getFileData=async function(Id){
    if(!mongoose.isValidObjectId(Id))
        throw new Error('invalid id')
    else
        return await File.findById(Id,'-__v -updatedAt')
        .populate('courseId','_id name')
        .populate('fieldId','_id name')
}

fileShcema.statics.createFile=async function(body){
    if(!mongoose.isValidObjectId(body.fieldId)||!mongoose.isValidObjectId(body.courseId))
        throw new Error('invalid id')
    else{
        const newFile =new File(body)
        await newFile.save();
        return 'file successfuly created'
    }
}

fileShcema.statics.deleteFile=async function(id){
    const found = await File.findById(id)
    if(!found||!mongoose.isValidObjectId(id))
        throw new Error('invalid id')
    else{
        await found.deleteOne();
        return 'file successfuly deleted'
    }
}

const File = mongoose.model('File',fileShcema);

module.exports = File;

