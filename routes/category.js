var express=require('express');
var router=express();
abd=[];
abc=function(i){
    this.i=i;
}
function add(i){
    temp=new abc(i);
    abd.push(temp);
}
for(i=0;i<10;i++){
    add(i);
}
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