var express=require('express');
var router=express();

router.get("/",function(req,res,next){
    res.render("category",{title:"Colection"});
})

module.exports = router;