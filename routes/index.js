var express = require('express');
var router = express.Router();
//sản phẩm nổi bật
products=[];
oneproduct=function(src,title,cp,op,dp,bidder){
  this.src=src;
  this.title=title;
  this.cp=cp;
  this.op=op;
  this.dp=dp;
  this.bidder=bidder;
}
function addProduct(productRoot,src,title,cp,op,dp,bidder){
  temp=new oneproduct(src,title,cp,op,dp,bidder);
  productRoot.push(temp);
}
addProduct(products,"images/iphone11.jpg","Iphone 11","4000USD","200USD","18/11/2019","G-D");
addProduct(products,"images/macpro2019.jpg","MacBook Air 2019","5000USD","220USD","18/11/2019","G-D2");
addProduct(products,"images/nokia7.2.jpg","Nokia 7.2","5000USD","220USD","18/11/2019","G-D2");
addProduct(products,"images/prox.jpg","Suface Pro X","5000USD","220USD","18/11/2019","G-D2");
addProduct(products,"images/s10.jpg","Samsung Galaxy S10+","5000USD","220USD","18/11/2019","G-D2");
user=0;

hotproduct=[];
addProduct(hotproduct,"images/rogphone.jpg","Asus ROG Gaming","5000USD","220USD","18/11/2019","G-D2");
addProduct(hotproduct,"images/alien42.jpg","Alien Ware Laptop","42000USD","220USD","18/11/2019","G-D2");
addProduct(hotproduct,"images/lggram.jpg","LG Gram 17","2000USD","220USD","18/11/2019","G-D2");
addProduct(hotproduct,"images/acernitro2019.jpg","Acer Nitro 2019","42000USD","220USD","18/11/2019","G-D2");
addProduct(hotproduct,"images/vertu.jpg","Vertu Signature S Yellow Gold","12000USD","220USD","18/11/2019","G-D2");

exPrice=[];
addProduct(exPrice,"images/vertu.jpg","Vertu Signature S Yellow Gold","12000USD","220USD","18/11/2019","G-D2");
addProduct(exPrice,"images/macpro2019.jpg","MacBook Air 2019","5000USD","220USD","18/11/2019","G-D2");
addProduct(exPrice,"images/prox.jpg","Suface Pro X","5000USD","220USD","18/11/2019","G-D2");
addProduct(exPrice,"images/acernitro2019.jpg","Acer Nitro 2019","42000USD","220USD","18/11/2019","G-D2");
addProduct(exPrice,"images/alien42.jpg","Alien Ware Laptop","42000USD","220USD","18/11/2019","G-D2");
/* GET home page. */
global.data=exPrice;
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home',
    timeout: products,
  });
});

module.exports = router;