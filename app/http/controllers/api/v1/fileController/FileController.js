const controller = require('../../../controller');
const File=require('../../../../../models/File');

class FileController extends controller {
    async getAllFiles(req,res,next){
        try {
            return this.success(await File.getFiles(req.query),res)
        } catch (error) {
            this.failed(error.message,res,400)
        }
    }

    async getFileById({params:{id}},res,next){
        try {
            return this.success(await File.getFileData(id),res)
        } catch (error) {
            this.failed(error.message,res,400)
        }
    }
}   


module.exports = new FileController();