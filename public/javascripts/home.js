$(window).scroll(function () {
    $(".logo").css("opacity", 1 - $(window).scrollTop() /56);
    if($(window).scrollTop()>=56){
        $(".navbar").addClass("fixed-top");
    }
    else{
        $(".navbar").removeClass("fixed-top");
    }
});

