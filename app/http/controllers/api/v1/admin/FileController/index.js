const controller = require('../../../../controller');
const File = require('../../../../../../models/File');
const fs =require('fs');

const minioClient =config.fileStorage;

class FileController extends controller {
    async getAllFiles({query,body:{offset}},res,next){
        try {
            if(offset%10===0){
                const files = await File.getFiles(query)
                return this.success(files.filter((item,index)=>((offset-10)<=index)&&(index<offset)),res)
            }else
                throw new Error('invalid number')
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

    async createFile(req,res){
        try{
            const errors = this.validationData(req);
            if(errors.length > 0){
                await fs.unlink(`./app/public/files/${req.file.filename}`,()=>console.log('deleted'));
                return this.failed(errors,res,400);
            }
            const {body} = req;
            minioClient.fPutObject(
                'choquk-files',
                req.file.filename,
                `./app/public/files/${req.file.filename}`,
                (err,etag)=>{
                    if(err)return this.failed('somthing wrong pls try again',res);
                    minioClient.presignedUrl('GET', 'choquk-files', req.file.filename,async (err, presignedUrl)=>{
                        if (err) return this.failed('somthing wrong pls try again',res)
                        await fs.unlink(`./app/public/files/${req.file.filename}`,()=>console.log('deleted'));
                        body.url = presignedUrl.split('?')[0];
                        try {
                            const result = await File.createFile(body)
                            return this.success(result,res)
                        } catch ({message}) {
                            return this.failed(message,res,400);
                        }
                    })
                }
            )
        } catch ({message}) {
            return this.failed(message,res,400);
        }
    }

    async updateFile(req,res){
        try {
            const errors = this.validationData(req);
            if(errors.length > 0){
                await fs.unlink(`./app/public/files/${req.file.filename}`,()=>console.log('deleted'));
                return this.failed(errors,res,400);
            }
            const {body,params:{id}} = req;
            const found = await File.getFileData(id)
            if(found){
                if(req.file){
                    minioClient.removeObject(
                        'choquk-files',
                        found.url.split('/')[4],
                        (err)=>{
                            if(err)return console.log(err);
                            // if(err)return this.failed('somthing wrong pls try again',res);
                            minioClient.fPutObject(
                                'choquk-files',
                                req.file.filename,
                                `./app/public/files/${req.file.filename}`,
                                (err,etag)=>{
                                    if(err)return this.failed('somthing wrong pls try again',res);
                                    minioClient.presignedUrl('GET', 'choquk-files', req.file.filename,async (err, presignedUrl)=>{
                                        if (err) return this.failed('somthing wrong pls try again',res)
                                        await fs.unlink(`./app/public/files/${req.file.filename}`,()=>console.log('deleted'));
                                        body.url = presignedUrl.split('?')[0];
                                        try {
                                            await found.updateOne({ $set:body });
                                            return this.success('file successfuly updated',res)
                                        } catch ({message}) {
                                            return this.failed(message,res,400);
                                        }
                                    })
                                }
                            )
                        }
                    )
                }else{
                    try {
                        await found.updateOne({ $set:body });
                        return this.success('file successfuly updated',res)
                    } catch ({message}) {
                        return this.failed(message,res,400);
                    }
                }
            }else{
                this.failed('invalid id',res)
            }
        } catch ({message}) {
            return this.failed(message,res,400)
        }
    }
    
    async deleteFile({params:{id}},res){
        try {
            const result = await File.deleteFile(id)
            return this.success(result,res)
        } catch ({message}) {
            return this.failed(message,res,400);
        }
    }
}   


module.exports = new FileController();