var express = require('express');
var router = express.Router();
var a="bảo đẹp trai";
/* GET users listing. */
router.get('/', function(req, res, next) {
  req.params({"bao":"deptrai"});
  console.log(req.params);
});
module.exports = router;
