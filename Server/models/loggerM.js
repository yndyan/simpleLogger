const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Constants = require('../libraries/consts');

const LoggerSchema = new Schema({
    userId   : {
        type: Schema.Types.ObjectId,
        required : true
    },
    logId : {
        type : String,
        required : true,
        trim: true
    },
    logDate : {
        type : Date,
        required : true
    }
});

LoggerSchema.index({ userId: 1, logDate : 1 }, { unique: true });

const Logger = mongoose.model('Logger', LoggerSchema);

Logger.addNewLog = function(newLog){
    //TODO check user with that id exist
    return newLog.save();
};
  
Logger.updateLog = function (updatedLogger) {
    return Logger.findOneAndUpdate({_id : updatedLogger._id}, {logId : updatedLogger.logId }).exec();
};

Logger.getUserLogs = function (params){
    // console.log('query', params.query);
    const resultStructure = { logDate : 1, logId : 1, _id : 1 };
    return Logger.find(params.query,resultStructure)
        .limit(params.limit)
        .sort(params.sort)
        .exec()
        .then(dataFromMongoose => {	
            return dataFromMongoose.map(
                item => {		
                    return {			
                        _id: item._id,			
                        logDate : item.logDate,
                        logName: Constants.logData[item.logId]
                        
                    };	
                });
        });//return promise
};

module.exports =  Object.freeze(Logger);