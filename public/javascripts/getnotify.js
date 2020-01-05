setInterval(()=>{
    $.ajax({
        type: "GET",
        url: "http://localhost:3000/admin/ajaxgetnotify",
        dataType: "json",
        success: (response) => {
            console.log(response.amoutNoti);
            $('.notification').html(response.amoutNoti);
        }
    });
},8000)