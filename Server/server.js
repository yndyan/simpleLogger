const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const url = 'mongodb://localhost/dailylog';
const mongoose = require('mongoose');


//mongoose.Promise = global.Promise;
mongoose.promise = require('bluebird');

mongoose.connect(url,{ useMongoClient: true });
const db = mongoose.connection;

db.on('error', function(err){
    if(err) throw err;
});

db.once('open', function callback () {
    console.log('Mongo db connected successfully on ', url);
});

const app = express();

const port = process.env.PORT || 3339;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true })); 

// Passport Middleware
app.use(passport.initialize());
//app.use(passport.session());
require('./libraries/passport')(passport);

require('./routes.js')(app);

app.listen(port, () => {
    console.log('Server started on port '+port);
});
