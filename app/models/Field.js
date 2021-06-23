const mongoose=require('mongoose');

const fieldSchema=mongoose.Schema({
    name: { type: String, require:true,unique:true},
},{ timestamps: true });

const Field =mongoose.model('Field',fieldSchema);;

module.exports= Field;