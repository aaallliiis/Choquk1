const Minio = require('minio')

module.exports = new Minio.Client({
    endPoint:process.env.MINIO_ENDPOINT,
    useSSL: true,
    accessKey:process.env.MINIO_ACCESSKEY,
    secretKey:process.env.MINIO_SECRETKEY,
});