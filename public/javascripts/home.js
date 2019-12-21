$(window).scroll(function () {
    let x = $(window).scrollTop();
    $(".logo").css("opacity", 1 - x / 56);
    $(".view").css("opacity", 1 - x / 1000);
    if ($(window).scrollTop() >= 56) {
        
        $(".view").css("opacity", 1 - 56 / 1000);
        $(".nav").addClass("fixed-top");
    }else{
        $(".nav").removeClass("fixed-top");
    }
});
$(".carousel-caption").fadeIn(1500);
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
var inputs = $(".date");
for(var i = 0; i < inputs.length; i++){
    temp=$(inputs[i]).html().split(":");
        temp1=new mDate(parseInt(temp[0]),parseInt(temp[1]),parseInt(temp[2]));
    
    dateArray.push(temp1);
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
    for (i = 0; i < dateArray.length; i++) {
        let temp = updateDate(dateArray[i]);
        time.push(temp);

    }
    check=0;
    for (i = 0; i < dateArray.length; i++) {
        if(time[i]==="00:00:00"){
            check++;
        }
        if(check===dateArray.length){
            clearInterval(pik);
        }
    }
    $(".date").each(function (index, element) {
        // element == this
        $(this).text(time[index]);
    });
}, 1000)

