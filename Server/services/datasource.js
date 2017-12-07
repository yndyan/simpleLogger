const express = require('express');
const router = express.Router();
const passport = require('passport');
const Constants = require('../libraries/consts');

router.use(passport.authenticate('jwt', {session:false}));

router.get('/',(req, reqRes) => {
    if(Constants.logData){
        reqRes.json({logs: Constants.logData});
    } else {
        reqRes.status(500).json({msg: 'error loading logData'});
    }
});

module.exports = Object.freeze(router);