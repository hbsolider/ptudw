function itemnotify(name,content,check,id,email,nameProduct) {
    item = `<li> <img class = "avatar" src = "https://s3.amazonaws.com/codecademy-content/projects/2/feedster/fn.svg"><h3> ${name} </h3> <p>${content}</p></li>`;
    item2 = `<li> <img class = "avatar" src = "https://s3.amazonaws.com/codecademy-content/projects/2/feedster/fn.svg"><h3> ${name} </h3> <p>${content}</p>`;
    extend = `<div class="row mx-2"><a href="#" onclick="accept(${id},'${email}','${nameProduct}')" class="mr-auto">ACCEPT</a><a href="#" onclick="deny(${id},'${email}','${nameProduct}')">DENY</a></div></li>`;
    if(check){ 
        return item2+extend
    }else{
        return item;
    }
}
var main = function () {
    $('.fa-bell').click(function () {
        $('.notification-menu').empty()
        $.ajax({
            type: "get",
            url: "http://localhost:3000/user/notification",
            dataType: "json",
            success: function (response) {
                console.log(response)
                if(response.check){
                    response.notiS.forEach(element => {
                        $('.notification-menu').append(itemnotify(element.username,`Muốn đấu giá sản phẩm <p class="font-weight-bold">${element.nameProduct}</p>  của bạn`,true,element.id,element.email,element.nameProduct))
                    });
                    response.noti.forEach(e=>{
                        $('.notification-menu').append(itemnotify(e.username,`Bạn đã được cho phép đấu giá sản phẩm <p class="font-weight-bold">${element.nameProduct}</p>`,false,e.id,e.email,e.nameProduct))
                    })
                }else{
                    response.noti.forEach(e=>{
                        $('.notification-menu').append(itemnotify(e.username,`Bạn đã được cho phép đấu giá sản phẩm <p class="font-weight-bold">${element.nameProduct}</p>`,false,e.id,e.email,e.nameProduct))
                    })
                }
            }
        });
        $('.notification-menu').toggle();
    });

    $('.post .btn').click(function () {
        $(this).toggleClass('btn-like');
    });
};
$(document).ready(main);

//when accept
function accept(id,email,nameProduct){
    Swal.fire({
        title:"Thông báo",
        text: "Bạn thực sự muốn chấp nhận lượt đấu giá này",
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText:"OK"
    }).then(val=>{
        if(val.value){
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/user/accept",
                data: {id,email,nameProduct},
                dataType: "json",
                success: function (res) {
                    if(res.success){
                        Swal.fire({
                            title:"Thao tác thành công",
                            icon: "success",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1000
                        })
                    }
                }
            });
        }
    })
   
}
function deny(id,email,nameProduct){
    Swal.fire({
        title: "Cảnh báo",
        text: "Bạn thực sự muốn từ chối lượt đấu giá này",
        icon: "error",
        showConfirmButton:true,
        confirmButtonColor: "#d33",
        showCancelButton: true,
        confirmButtonText: "Yes, Deny!",
    }).then(val=>{
        if(val.value){
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/user/deny",
                data: {id,email,nameProduct},
                dataType: "json",
                success: function (res) {
                    if(res.success){
                        Swal.fire({
                            title:"Thao tác thành công",
                            icon: "success",
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 1000
                        })
                    }
                }
            });
        }
    })
    
}