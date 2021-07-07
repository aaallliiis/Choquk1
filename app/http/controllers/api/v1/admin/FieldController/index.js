const controller = require('../../../../controller');
const Field = require('../../../../../../models/Field');

class FiieldController extends controller {
    async getAllFields(req,res){
        return this.success(await Field.getFields(),res)
    }

    async getFieldById({params:{id}},res){
        return this.success(await Field.getFieldData(id),res)
    }

    async createField(req,res){
        const errors = this.validationData(req);
        if(errors.length > 0)
            return this.failed(errors,res,400);
        const {body} = req;
        const found = await Field.findOne(body)
        if(found){
            return this.failed('name duplicated',res,400)
        }
        const newField =new Field(body)
        await newField.save();
        return this.success('field successfuly created',res)
    }

    async updateField(req,res){
        const errors = this.validationData(req);
        if(errors.length > 0)
            return this.failed(errors,res,400);
        const {body,params:{id}} = req;
        const found = await Field.findOne(body)
        if(found){
            return this.failed('name duplicated',res,400)
        }
        const field = await Field.findByIdAndUpdate(id,{$set:body})
        return this.success('field successfuly updated',res)
    }
}   


module.exports = new FiieldController();