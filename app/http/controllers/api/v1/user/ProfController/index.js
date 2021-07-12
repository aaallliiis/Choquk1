const controller = require('../../../../controller');
const Prof = require('../../../../../../models/Prof');

class ProfController extends controller {
    async getAllProfs(req,res){
        return this.success(await Prof.getProfs(),res)
    }

    async getProfById({params:{id}},res){
        return this.success(await Prof.getProfData(id),res)
    }
}   


module.exports = new ProfController();