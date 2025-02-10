const mongoose = require('mongoose');
require('dotenv').config();
const dbgr = require('debug')('development:mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'marais-bags';

mongoose.connect(`${MONGODB_URI}/${DB_NAME}`)
        .then(function() {
            dbgr('Connected to DB');
        })
        .catch(function(err) {
            dbgr(err);
        })

module.exports = mongoose.connection;