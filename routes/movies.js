var express = require('express');
var router = express.Router();

//Models

const Movies = require('../models/Movies');

router.get('/', (req, res) => {
  const promise = Movies.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as : 'director'
      }
    },
    {
      $unwind: '$director'
    }
  ]);
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});


//TOP10 list
router.get('/top10', (req, res) => {
  const promise = Movies.find({  }).limit(10).sort({ imdb_score: -1 });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/:movie_id', (req, res,next) => {
  // res.send(req.params.movie_id);

  const promise = Movies.findById(req.params.movie_id);
  promise.then((movie) => {
    if (!movie)
      next({ message:'The movie was not found.', code:99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});

router.put('/:movie_id', (req, res,next) => {
  // res.send(req.params.movie_id);

  const promise = Movies.findByIdAndUpdate(req.params.movie_id, req.body, {
    new: true
  });
  promise.then((movie) => {
    if (!movie)
      next({ message:'The movie was not found.', code:99 });
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});

router.delete('/:movie_id', (req, res,next) => {
  // res.send(req.params.movie_id);

  const promise = Movies.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) => {
    if (!movie)
      next({ message:'The movie was not found.', code:99 });
    res.json({status:1, deleted:true});
  }).catch((err) => {
    res.json(err);
  })
});

router.post('/', (req, res) => {
  // const { title,imdb_score,category,country,year } = req.body;

  const movies = new Movies(req.body);

  // movie.save((err,data) => {
  //   if (err)
  //     res.json(err);
  //   res.json({ status: 1 });
  // });

  const promise = movies.save();

  promise.then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json(err);
  });

});

router.get('/between/:start_year/:end_year', (req, res) => {
// gte küçükten büyüğe eşit demek e = eşit lte büyükten küçüğe demek
  const { start_year,end_year } = req.params;
  const promise = Movies.find(
      {
        year:{"$gte":parseInt(start_year), "$lte": parseInt(end_year)}
      }
  );
  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  })
});


module.exports = router;
