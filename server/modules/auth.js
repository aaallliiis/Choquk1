const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync');
const e = require('express');

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

    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if(err) {
            return res.status(402).json({ errors: ["smt wrong dadach!"] });
        }
        console.log(result)
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
        .find({ email: req.body.email })
        .value()

    if (user) {
        return res.status(402).json({ errors: ["existed user."] });
    }

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err) {
            return res.status(402).json({ errors: ["smt wrong dadach!"] });
        }

        db.get('users')
            .push( { 
                email: req.body.email,
                password: hash,
                name: req.body.name
            })
            .write()

        return res.json({status: 'user created', user: { 
            email: req.body.email,
            name: req.body.name
        }})
    });
}


module.exports = {
    loginValidator,
    login,
    signupValidator,
    signup
}