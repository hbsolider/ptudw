
var express = require('express');
var router = express.Router();
temp=global.data;
router.get('/', function(req, res, next) {
  
  console.log(temp);
  res.render('signin', { title: 'Sign in' });
});

module.exports = router;