const controller = require('../../../../controller');
const Prof = require('../../../../../../models/Prof');

class ProfController extends controller {
    async getAllProfs(req,res){
        return this.success(await Prof.getProfs(),res)
    }

    async getProfById({params:{id}},res){
        return this.success(await Prof.getProfData(id),res)
    }

    async createProf(req,res){
        try {
            const errors = this.validationData(req);
            if(errors.length > 0)
                return this.failed(errors,res,400);
            const {body} = req;
            const found = await Prof.findOne(body)
            if(found){
                return this.failed('نام تکراری میباشد',res,400)
            }
            const newProf =new Prof(body)
            await newProf.save();
            return this.success('استاد با موفقیت اضافه شد',res)
        } catch ({message}) {
            return this.failed(message,res,400);
        }
    }

    async updateProf(req,res){
        try {
            const errors = this.validationData(req);
            if(errors.length > 0)
                return this.failed(errors,res,400);
            const {body,params:{id}} = req;
            const result = await Prof.updateProf(body,id)
            return this.success(result,res)
        } catch ({message}) {
            return this.failed(message,res,400);
        }
    }

    async deleteProf({params:{id}},res){
        try {
            const result = await Prof.deleteProf(id)
            return this.success(result,res)
        } catch ({message}) {
            return this.failed(message,res,400);
        }
    }
}   


module.exports = new ProfController();