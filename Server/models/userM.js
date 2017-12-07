const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const Email = require('../libraries/email');


const UserSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim: true,
        lowercase: true,
    },
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    emailtoken : {
        type : String,
        unique : true,
    },
    emailVerified : {
        type: Boolean,
        default  : false
    },
    password: {
        type : String,
        required : true
    },
    role :  {
        type : String,
        required : true
    },
    passwordtoken :  {
        type : String,
    },
});

const User =  mongoose.model('User', UserSchema);


User.getUserByUsername = function(username){
    return User.findOne({username: username}).exec();
};

User.addUser = function(newUser){
    return new Promise(function(resolve, reject){
        if(newUser.password === ''){//TODO add more password check
            reject({message :'password is required'});
        } else {
            bcrypt.genSalt(10, function(err, salt){
                if(err) reject (err);
                bcrypt.hash(newUser.password, salt, function(err, hash){
                    if(err) reject (err);
                    newUser.password   = hash;
                    newUser.save(function(err,res){
                        if(err){
                            reject(err);
                        } else {
                            Email.sendEmail('yndyan@gmail.com', res.emailtoken);
                            resolve(res);
                        }
                    });
                });
            });
        }
    });
};


User.comparePassword = function(plainPass, hashword) {
    return new Promise((resolve, reject)=>{
        bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
            if(err!==null){
                console.log('Pass not match');//TODO  maybe to respond wiht reject if isPasswordMatch  != true 
                reject(err);
            } else {
                resolve(isPasswordMatch);
            }
        });
    });
};

User.verifyUserEmail= function (emailtoken){
    return  User.findOneAndUpdate({emailtoken : emailtoken}, {emailVerified : true, emailtoken : ' '  },{ runValidators: true }).exec();
};

module.exports = Object.freeze(User);