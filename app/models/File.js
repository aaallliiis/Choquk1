const mongoose=require('mongoose');

const fileShcema=mongoose.Schema({
    title:{ type:String , require:true },
    description:{ type:String , require:true },
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
    courseId: { type: mongoose.Schema.Types.ObjectId,ref:'Course' },
    url:{ type:String , require:true },
    type:{ type:String , require:true },
},{ timestamps: true });

const File = mongoose.model('File',fileShcema);

module.exports = File;

