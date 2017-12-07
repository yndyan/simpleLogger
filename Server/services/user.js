const express = require('express');
const router = express.Router();
const User = require('../models/userM');

router.post('/verifyemail', (req, reqRes) => {

    User.verifyUserEmail(req.body.verifycode)
        .then((res)=>{
            console.log(res);
            if(res !== null ){
                reqRes.json({success: true});
            } else {
                reqRes.json({success: false, msg : 'invalid token' });
            }
        })
        .catch((err)=>{
            console.log(err);
            reqRes.status(500).json({success: false, msg : err.message });
            module.exports = router;
            
        });


});

module.exports = Object.freeze(router);
