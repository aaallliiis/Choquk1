const controller = require('../../../../controller');
const Field=require('../../../../../../models/Field');

class FieldController extends controller {
    async getAllFields(req,res,next){
        return this.success(await Field.getFields(),res)
    }

    async getFieldById({params:{id}},res,next){
        return this.success(await Field.getFieldData(id),res)
    }
}   


module.exports = new FieldController();