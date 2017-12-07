const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const consts = require('../libraries/consts');
const User = require('../models/userM');


// router.post('/', (req, reqRes) => {
//     const  username = req.body.username;
//     const  password = req.body.password;
//     let  user1;
//     User.getUserByUsername(username)
//         .then(function(user){
//             user1 = user;
//             console.log('User found');
//             return User.comparePassword(password,user.password);
//         })
//         .then((passwordAreEqual)=>{
//             if(passwordAreEqual){
//                 console.log('Password is correct');
//                 const token = jwt.sign( {username : user1.username, email : user1.email},consts.jwtSecret, {expiresIn : 4000 } );
//                 reqRes.json({success: true, token: 'JWT '+token, username : user1.username, role :  user1.role});
//             } else {
//                 reqRes.status(500).json({success: false, msg : 'username/password not correct' });
//             }
//         })
//         .catch(()=>{
//             reqRes.status(500).json({success: false, msg : 'username/password not correct' });

//         });
// });

router.post('/', (req, reqRes) => {

    
    const  username = req.body.hasOwnProperty('username') ? req.body['username'] : '';
    const  password = req.body.hasOwnProperty('password') ? req.body['password'] : '';

    const a = User.getUserByUsername(username);
    const b = a.then( user =>  User.comparePassword(password,user.password));
    console.log(username);
    console.log(password);   
    Promise.all([a, b])
        .then(([user,passwordAreEqual])=>{
            if(passwordAreEqual){
                console.log('Password is correct');
                const token = jwt.sign( {username : user.username, email : user.email},consts.jwtSecret, {expiresIn : 4000 } );
                reqRes.json({token: 'JWT '+token, username : user.username, role :  user.role});
            } else {
                throw({msg : 'username/password not correct' });
            }
        })
        .catch((err)=>{
            console.log(err)
            reqRes.status(500).json({msg : 'username/password not correct' });

        });

});



module.exports = Object.freeze(router);