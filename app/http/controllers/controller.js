const axios = require('axios');
const autoBind = require('auto-bind');
const { validationResult } = require('express-validator');

module.exports = class controller {
    constructor() {
        autoBind(this);
    }

    failed(msg , res , statusCode = 500) {
        res.status(statusCode).json({
            error : msg,
            status : 'error'
        })
    }

    success(msg , res , statusCode = 200) {
        res.status(statusCode).json({
            data : msg,
            status : 'success'
        })
    }

    validationData(req) {
        const messages = []; 
        const result = validationResult(req);
        if (!result.isEmpty()) {
            result.array().map(item=>messages.push(item.msg))
        }
        return messages;
    }

    generateToken() {
        return Math.floor(100000 + Math.random() * 900000);
    }

    async sendCode({token,phoneNumber},res){
        return axios.post('https://RestfulSms.com/api/Token',{
            "UserApiKey":"9ea747d33aaaa10efdc747d",
            "SecretKey":"@liSoltaniInCodeSakhte:|"
        }).then(({data:{TokenKey}})=>{
            axios.post('https://RestfulSms.com/api/MessageSend',{
                Messages:[token],
                MobileNumbers: [phoneNumber],
                LineNumber: "30002828222228",
                SendDateTime: "",
                CanContinueInCaseOfError: "false",        
            },{
                headers:{'x-sms-ir-secure-token':TokenKey}
            }).then(()=>this.success('code sent',res))
            .catch(err=>this.failed("smt wrong pls try again.",res))
        })
        .catch(err=>this.failed("smt wrong pls try again.",res))
    }
}