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
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
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
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                bio: '$_id.bio',
                movies: '$movies'
            }
        }
    ]);
    promise.then((data) => {
        res.json(data[0]);
    }).catch((err) => {
        res.json(err);
    });
});

router.put('/:director_id', (req, res,next) => {
    // res.send(req.params.director_id);

    const promise = Directors.findByIdAndUpdate(req.params.director_id, req.body, {
        new: true
    });
    promise.then((director) => {
        if (!director)
            next({ message:'The director was not found.', code:99 });
        res.json(director);
    }).catch((err) => {
        res.json(err);
    })
});

router.delete('/:director_id', (req, res,next) => {
    // res.send(req.params.director_id);

    const promise = Directors.findByIdAndRemove(req.params.director_id);
    promise.then((director) => {
        if (!director)
            next({ message:'The director was not found.', code:99 });
        res.json({status:1, deleted:true});
    }).catch((err) => {
        res.json(err);
    })
});



module.exports = router;
