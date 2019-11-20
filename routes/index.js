var express = require('express');
var router = express.Router();
//sản phẩm nổi bật
function element(src,detail,content){
  this.src=src;
  this.detail=detail;
  this.content=content;
}
var imgsrc=[];
function add_imgsrc(src,detail,content){
  temp=new element(src,detail,content);
  imgsrc.push(temp);
}
add_imgsrc("images/one.jpg","title 1","");
add_imgsrc("images/two.jpg","title 2","");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    imgsrc: imgsrc
  });
});

module.exports = router;