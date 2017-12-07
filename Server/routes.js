const logger = require('./services/logger');
const datasource = require('./services/datasource');
const auth = require('./services/auth');
const register = require('./services/register');
const path = require('path');

module.exports = function(app) {
    //routes
    app.use('/api/logger/', logger);
    app.use('/api/datasource/', datasource);
    app.use('/api/authenticate', auth);
    app.use('/api/register', register);
    app.get('/api', (req, res) => {
        res.send('Invalid Endpoint');
    });

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });
};
