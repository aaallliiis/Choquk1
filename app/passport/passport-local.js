const passport=require('passport');
const localstrategy = require('passport-local').Strategy;
const User=require('../models/User');
const Admin=require('../models/Admin');
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
    done(err, user);
    });
});

passport.use('local.admin',new localstrategy({
    passReqToCallback:true
},(req,username,password,done)=>{
    try{
        Admin.findOne({username},(err,user)=>{
            if(err) return done(err);
            if(!user||!Admin.rehash(password,user.password))return done(null,false,{message:'Admin not found'});
            return done(null,user);
        })
    }
    catch(err){
        done(err,false);
    }
}))

passport.use('local.login',new localstrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req,email,password,done)=>{
    try{
        User.findOne({email},(err,user)=>{
            if(err) return done(err);
            if(!user||!User.rehash(password,user.password))return done(null,false,{message:'user not found'});
            return done(null,user);
        })
    }
    catch(err){
        done(err,false);
    }
}))

passport.use('local.register' ,new localstrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback:true
    },async(req,email , password , done)=> {
        const {name,phoneNumber,lastName,uniCode,orientation,field,birthDate} = req.body;
        await User.findOne({$or: [
            {email},
            {phoneNumber},
            {uniCode}
        ]}, async(err , user)=> {
            if(err)  return done(err);
            if(user) return done(null,false,{message:'this email or phoneNumber or uniCode has been taken before'});
            const newUser= new User({
                email,
                name,
                lastName,
                phoneNumber,
                password,
                uniCode,
                orientation,
                field,
                birthDate,
            });
            await newUser.save(err=>{
                if(err) done(err,false);
                done(null,newUser);
            })
        });
    })
);