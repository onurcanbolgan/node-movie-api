var express = require('express');
var router = express.Router();


// Models
const Directors = require('../models/Directors');

router.get('/', function(req, res, next) {
    res.render('index',{ title:'Directors API'});
});

router.post('/', function(req, res, next) {
    const directors = new Directors(req.body);
    const promise = directors.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
});

module.exports = router;
