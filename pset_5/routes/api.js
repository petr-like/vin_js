var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});


module.exports = router;