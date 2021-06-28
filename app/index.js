const app=require('express')();
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require('cors');
const passport=require('passport');

module.exports = class Application{
    constructor(){
        this.setupExpress();
        this.setupMongoose();
        this.setConfig();
        this.setupRouter();
    }
    setupExpress(){
        app.listen(config.port,()=>console.log(`server is running on port:${config.port}`))
    }
    setupRouter(){
        app.use(require('./router/api'));
    }
    async setupMongoose(){
        mongoose.Promise=global.Promise;
        await mongoose.connect(config.database.url,{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false,
            authSource:'admin'})
        console.log('connected to DB');
    }
    setConfig(){
        require('./passport/passport-local');
        require('./passport/passport-jwt');
        app.use(passport.initialize());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:true}));
        app.use(cors())
    }
}