const mongoose=require('mongoose');

const courseSchema=mongoose.Schema({
    name: { type: String, default:null},
    profName: { type: String, default:null},
    fieldId: { type: mongoose.Schema.Types.ObjectId,ref:'Field' },
},{ timestamps: true });

const Course = mongoose.model('Course',courseSchema);

module.exports=Course;
