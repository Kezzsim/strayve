var express = require('express');
var router = express.Router();

/*
  * GET home page.
  * Leaving this here in the event we switch to a Templating engine, otherwise everything happens in app.js
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
