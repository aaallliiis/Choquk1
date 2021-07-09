/* eslint-disable class-methods-use-this */
const multer = require('multer');
const mkdirp = require('mkdirp');
const path = require('path');
const middleware = require('./Middleware');

module.exports = new (class uploadMiddleware extends middleware {
  upload(address) {
    const diskStorage = multer.diskStorage({
      destination: async function (req, file, cb) {
        await mkdirp(address);
        cb(null, address);
      },
      filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
      },
    });
    const fileFilter = (req, file, cb) => {
      if(!['.jpg','.jpeg','.png','.pdf','.mp3','.mp4','.mov','.mkv','docx'].includes(path.extname(file.originalname))){
        return cb(new Error('پسوند فایل صحیح نیست'))
      }
      return cb(null,true);
    };
    return multer({ storage: diskStorage, fileFilter });
  }
  async handleFiles(req, res, next) {
    req.body.file = req.file ? req.file.filename : undefined;
    if (!req.body.file) delete req.body.file;
    next();
  }
})();