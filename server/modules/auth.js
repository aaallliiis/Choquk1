const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const e = require('express');
const { default: axios } = require('axios');

const adapter = new FileSync('db.json')
const db = low(adapter)

const saltRounds = 10;
const jwtKey = 's0/\/\P4$$w0rD';

const loginValidator = [
    body('email').exists().withMessage('nist').isEmail().withMessage('kharabe'),
    body('password', 'Invalid password').exists(),
]  

function login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(402).json({ errors: errors.array() });
    }
  
    const user = db
      .get('users')
      .find({ email: req.body.email })
      .value()

    if (!user) {
        return res.status(402).json({ errors: ["not found user."] });
    }

    if(!user.active){
        return res.status(402).json({ errors: ["user is deactive pls verify your phone number"] });
    }

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if(err) {
            return res.status(402).json({ errors: ["smt wrong dadach!"] });
        }

        if(result) {
            const token = jwt.sign({email: req.body.email}, jwtKey, { expiresIn: '7d' });
            return res.json({status: 'signed in', token})
        } else {
            return res.status(402).json({ errors: ["wrong pass"] });
        }
    });
}

const signupValidator = [
    body('email').exists().withMessage('nist').isEmail().withMessage('kharabe'),
    body('password', 'Invalid password').exists().isLength({ min: 8 }),
    body('name', 'Invalid name').exists().isLength({ min: 3 }),
]

function signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(402).json({ errors: errors.array() });
    }

    const user = db
        .get('users')
        .find(u=> u.email=== req.body.email || u.phoneNumber=== req.body.phoneNumber)
        .value()

    if (user) {
        return res.status(402).json({ errors: ["existed user."] });
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err) {
            return res.status(402).json({ errors: ["smt wrong dadach!"] });
        }

        const newUser={ 
            email: req.body.email,
            password: hash,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            active:false,
            token:  Math.floor(100000 + Math.random() * 900000)
        }
        
        axios.post('https://RestfulSms.com/api/Token',{
            "UserApiKey":"9ea747d33aaaa10efdc747d",
            "SecretKey":"@liSoltaniInCodeSakhte:|"
        }).then(({data:{TokenKey}})=>{
            axios.post('https://RestfulSms.com/api/MessageSend',{
                Messages:[newUser.token],
                MobileNumbers: [newUser.phoneNumber],
                LineNumber: "30002828222228",
                SendDateTime: "",
                CanContinueInCaseOfError: "false",        
            },{
                headers:{'x-sms-ir-secure-token':TokenKey}
            }).then(()=>{
                db.get('users')
                .push(newUser)
                .write()

                return res.json({status: 'user created', user: { 
                    email: newUser.email,
                    name: newUser.name,
                    phoneNumber: newUser.phoneNumber
                }})
            }).catch(err=>res.status(500).json({ errors: ["smt wrong pls try again."] }))
        })
        .catch(err=>res.status(500).json({ errors: ["smt wrong pls try again."] }))
    });
}

function verification(req,res){
    const user = db
        .get('users')
        .find({phoneNumber:req.body.phoneNumber})
        .value()

    if (!user) {
        return res.status(402).json({ errors: ["user not found."] });
    }

    if(user.token.toString()===req.body.token){
        user.active= true 
        db.write()
        return res.status(200).json({ status: "user actived successfully" });
    }else{
        return res.status(402).json({ errors: ["invalid code"] });
    }
}

module.exports = {
    loginValidator,
    login,
    signupValidator,
    signup,
    verification
}