const btnDecreaseBid = $('.decreaseBid');
const btnIncreaseBid = $('.increaseBid');
var bidValue = 100;

function up() {
  bidValue += 100;
  document.getElementById('NewBidText').value = bidValue;
  return;
}

function down() {
  if (bidValue > 100)
    bidValue -= 100;
  document.getElementById('NewBidText').value = bidValue;
  return;
}
//lấy thông tin bidder chủ và 
tinymce.init({
  selector: '#detail',
  readonly: 1,
  toolbar: false,
  menubar: false
})


$(".bidding_button").click(() => {
  let id = $('#productid').val();
  let NewBidText = $('#NewBidText').val();
  let idseller = $('#idSeller').val();
  let nameproduct = $('.title').html();
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/product/bid",
    data: {id},
    dataType: "json",
    success: function (response) {
      if (response.check === false) {
        Swal.fire({
          text: "Bạn cần đăng nhập để thực hiện tính năng này !",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor:'#d33',
          confirmButtonText: "Sign in",
        }).then(result=>{
          if(result.value){
            location.href = `http://localhost:3000/user/signin`
          }
        })
      }
      if(response.isSeller === true){
        Swal.fire({
          text: "Bạn là người đăng bán không thể đấu giá",
          icon: "warning",
          showCancelButton: false,
          cancelButtonColor:'#d33',
          timer: 1000
        })
      }
      if(response.deny){
        Swal.fire({
          text: "Bạn đã bị từ chối đấu giá sản phẩm này",
          icon: "error",
          showCancelButton: false,
          cancelButtonColor:'#d33',
          timer: 1500
        })
      }
      if(response.ranking === false){
        Swal.fire({
          title:"Điểm đánh giá quá thấp",
          text: "Bạn hiện thời không thể đấu giá",
          icon:"error",
          timer: 1000
        })
      }
      if(response.confirm){
        nowprice = parseInt(response.nowprice) +parseInt(NewBidText)*1000;
        console.log(nowprice);
        Swal.fire({
          title:`Bạn có muốn ra giá ${nowprice} cho cho sản phẩm này ?`,
          icon:"warning",
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText:"Yes"
        }).then(result=>{
          if(result.value){
            $.ajax({
              type: "POST",
              url: "http://localhost:3000/product/confirmbid",
              data: {price: nowprice,id,nameproduct,idseller},
              dataType: "json",
              success: function (response) {
                if(response.success){
                  Swal.fire({
                    title: "Success",
                    icon: "success",
                    timer: 1000
                  }).then(result=>{
                    location.href=`http://localhost:3000/product/id=${id}`
                  })
                }
              }
            });
          }
        })
      }
    }
  });
})