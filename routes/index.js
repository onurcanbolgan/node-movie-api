const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Models
const Users = require('../models/Users');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Movie-Api' });
});

router.post('/register', function(req, res, next) {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    const users = new Users({
      username,
      password: hash
    });

    const promise = users.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });


});

router.post('/authenticate', (req,res) => {
  const { username, password } = req.body;

  Users.findOne({
    username
  }, (err,user) => {
    if (err)
      res.json(err);

    if (!user){
      res.json({
        status: false,
        message: 'Authentication failed, user not found.'
      });
    }else{
      bcrypt.compare(password, user.password).then((result) => {
        if (!result){
          res.json({
            status: false,
            message: 'Authentication failed, wrong password.'
          });
        }else{
          const payload = {
            username
          };
          const token = jwt.sign(payload,req.app.get('api_secret_key'), {
            expiresIn: 720 // 12 saat
          });
          res.json({
            status: true,
            token
          })
        }
      }).catch((err) => {
        res.json(err);
      });
    }
  });
});

module.exports = router;
