const mongoose = require('mongoose');
var express = require('express');
var router = express.Router();


// Models
const Directors = require('../models/Directors');


router.post('/', function(req, res, next) {
    const directors = new Directors(req.body);
    const promise = directors.save();
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err)
    })
});

router.get('/', function(req, res, next) {
    const promise = Directors.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name : '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
       res.json(err);
    });
});

router.get('/:director_id', function(req, res, next) {
    const promise = Directors.aggregate([
        {
          $match: {
              '_id': mongoose.Types.ObjectId(req.params.director_id)
          }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays:true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name : '$name',
                    surname: '$surname',
                    bio: '$bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id.id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
