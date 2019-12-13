var express=require('express');
var router=express();


router.get("/",function(req,res,next){
    res.render("category",{title:"Colection"});
})
router.get("/phone",function(req,res,next){
    res.render("cate-phone",{title:"Phone"});
})
router.get("/demo",function(req,res,next){
    res.render("demo",{title:"demo-show"});
})
module.exports = router;