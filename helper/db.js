const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://Onur:onurcan123@ds211099.mlab.com:11099/heroku_18bs6jwk', { useNewUrlParser: true, useFindAndModify:false });
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Conencted');
    });

    mongoose.connection.on('error', () => {
        console.log('MongoDB: Failed');
    });

    mongoose.Promise = global.Promise;

};