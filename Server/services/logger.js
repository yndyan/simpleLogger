const express = require('express');
const router = express.Router();
const Log = require('../models/loggerM');
const passport = require('passport');

router.use(passport.authenticate('jwt', {session:false}));


router.put('/',(req, reqRes) => {
    const updatedLogger = { };
    if(req.body.hasOwnProperty('_id')){
        updatedLogger['_id'] =  req.body['_id'];
    }
    if(req.body.hasOwnProperty('logId')){
        updatedLogger['logId'] =  req.body['logId'];
    }
    Log.updateLog(updatedLogger)
        .then(()=> reqRes.json({msg: 'updated'}))
        .catch(err=> reqRes.status(409).json({msg : err.message}));
});


router.post('/',(req, reqRes) => {
    const newLogger = new Log ({ userId : reqRes.req.user._id });
    if(req.body.hasOwnProperty('logId')){
        newLogger['logId'] =  req.body['logId'];
    }
    if(req.body.hasOwnProperty('logDate')){
        newLogger['logDate'] =  req.body['logDate'];
    }
    Log.addNewLog(newLogger)
        .then(()=> reqRes.status(201).json({msg: 'added'}))
        .catch(err=> reqRes.status(500).json({msg: err.message}));
});



router.get('/',(req, reqRes) => {
    const params = { query : { userId : reqRes.req.user._id } };
    
    if(req.query.hasOwnProperty('logDate')){
        params.query['logDate'] =  req.query['logDate'];
    }
    if(req.query.hasOwnProperty('logId')){
        params.query['logId'] =  req.querys['logId'];
    }
    params.limit = (req.query.hasOwnProperty('limit') && Number(req.query['limit']) < 5)  ? Number(req.query['limit']) : 5;
    params.sort = req.query.hasOwnProperty('sort') ? req.query['sort'] : { logDate: 'descending' }; 

    Log.getUserLogs(params)
        .then(res=> reqRes.json({logs: res}))
        .catch(err=> reqRes.status(500).json({msg: err}));
});

module.exports = Object.freeze(router);