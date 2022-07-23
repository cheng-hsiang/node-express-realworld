const mongoose = require('mongoose');
const { dbUri } = require('../config/config.default')
mongoose.connect(dbUri);
const db = mongoose.connection;
db.once('open', function () {
    console.log('start')
})


module.exports = {
    User: mongoose.model('User', require('./user')),
    Article: mongoose.model('Article', require('./article'))
}
