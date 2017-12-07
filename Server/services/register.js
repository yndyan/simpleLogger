const express = require('express');
const router = express.Router();
const User = require('../models/userM');
const crypto = require('crypto');


router.post('/', (req, reqRes) => {
    const token = crypto.randomBytes(24).toString('hex');
    //TODO check same toklen exist already in db
    
    const newUser = new User({   
        role : 'default',
        emailtoken: token
    });

    if(req.body.hasOwnProperty('email')){
        newUser['email'] =  req.body['email'];
    }
    
    if(req.body.hasOwnProperty('username')){
        newUser['username'] =  req.body['username'];
    }

    if(req.body.hasOwnProperty('password')){
        newUser['password'] =  req.body['password'];
    }

    if(req.body.hasOwnProperty('email')){
        newUser['email'] =  req.body['email'];
    }
    console.log(newUser);
    User.addUser(newUser)
        .then(()=> reqRes.status(201).json({msg:'User registered'}))
        .catch(err=> reqRes.status(409).json({msg: err.message}));
});

module.exports = Object.freeze(router);