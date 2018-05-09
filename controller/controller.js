const db = require('../models');
const express = require('express');
const router = express.Router();
var handlebarsObject;

router.get('/', function(req, res) {
  db.Article.find({}).then(function(result) {
    handlebarsObject = {
      articles: result
    };
    res.render('index', handlebarsObject);
  });
});

router.get('/saved', function(req, res) {
  db.Article.find({}).then(function(result) {
    handlebarsObject = {
      articles: result
    };
    res.render('saved', handlebarsObject);
  });
});

module.exports = router;
