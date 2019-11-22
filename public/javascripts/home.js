$(window).scroll(function () {
    let x = $(window).scrollTop();
    $(".logo").css("opacity", 1 - x / 56);
    $(".view").css("opacity", 1 - x / 1000);
    if ($(window).scrollTop() >= 56) {
        $(".nav").addClass("fixed-top");
        $(".nav-brand").show();
        $("#nav").addClass("justify-content-between");
        $(".navbar-nav").addClass("ml-auto");
        $("#navv").removeClass("container");
        $("#navv").addClass("container-fluid");
        $(".carousel-caption").fadeIn(1500);
        $(".view").css("opacity", 1 - 56 / 1000);
    } else {
        $(".nav").removeClass("fixed-top");
        $(".nav-brand").hide();
        $("#navv").removeClass("container-fluid");
        $("#navv").addClass("container");
        $(".navbar-nav").removeClass("ml-auto");
    }
});
$('.carousel').carousel({
    interval: 5000
})
let hour=Math.floor(Math.random()*5);
let minute=Math.floor(Math.random()*59);
let second=Math.floor(Math.random()*59);
var mDate=function(h,m,s){
    this.h=h;
    this.m=m;
    this.s=s;
}
let d;
date=new mDate(hour,minute,second);
$(document).ready(function () {
    $(".date").html(d);
});

pik=setInterval(function(){
    
    
    if(date.s<10&&date.m<10){
        d=date.h+":0"+date.m+":0"+date.s;
    }
    else if(date.s<10){
        d=date.h+":"+date.m+":0"+date.s;
    }
    else if(date.m<10){
        d=date.h+":0"+date.m+":"+date.s;
    }
    else{
        d=date.h+":"+date.m+":"+date.s;
    }
    date.s--;
    if(date.s<0){
        date.s=59;
        date.m--;
    }
    if(date.m<0){
        date.m=59;
        date.h--;
        if(date.h<0){
            d="00:00:00";
            $(".date").html(d);
            clearInterval(pik);
        }
    }
    $(".date").html(d);
},1000)