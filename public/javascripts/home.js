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
});

var mDate = function (h, m, s) {
    this.h = h;
    this.m = m;
    this.s = s;
}
let d;
dateArray = [];
for (i = 0; i < 15; i++) {
    let hour = Math.floor(Math.random() * 59);
    let minute = Math.floor(Math.random() * 59);
    let second = Math.floor(Math.random() * 59);
    date = new mDate(hour, minute, second);
    dateArray.push(date);
}

function updateDate(time) {
    if(time.h<0){
        d="00:00:00";
        return d;
    }
    if(time.h<10){
        if(time.m<10){
            if(time.s<10){
                d="0"+time.h+":0"+time.m+":0"+time.s;
            }
            else{
                d="0"+time.h+":0"+time.m+":"+time.s;
            }
        }
        else{
            if(time.s<10){
                d="0"+time.h+":"+time.m+":0"+time.s;
            }
            else{
                d="0"+time.h+":"+time.m+":"+time.s;
            }
        }
    }else{
        if(time.m<10){
            if(time.s<10){
                d=time.h+":0"+time.m+":0"+time.s;
            }
            else{
                d=time.h+":0"+time.m+":"+time.s;
            }
        }
        else{
            if(time.s<10){
                d=time.h+":"+time.m+":0"+time.s;
            }
            else{
                d=time.h+":"+time.m+":"+time.s;
            }
        }
    }
    time.s--;
    if(time.s<0){
        time.s=59;
        time.m--;
    }
    if(time.m<0){
        time.m=59;
        time.h--;
    }
    return d;
}

function clear(array) {
    while (array.length) {
        array.pop();
    }
}
pik = setInterval(function () {
    time = [];
    clear(time);
    for (i = 0; i < 15; i++) {
        let temp = updateDate(dateArray[i]);
        if (temp === "00:00:00") {}
        time.push(temp);

    }
    $(".date").each(function (index, element) {
        // element == this
        $(this).html(time[index]);
    });
}, 1000)