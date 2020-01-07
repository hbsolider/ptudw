const closeCartBtn = document.querySelector(".close-cart");
const cartBtn = document.querySelector(".cart-btn");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");

class UI {
    setupApp() {
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    showCart() {
        //get list 
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/user/getmylist",
            dataType: "json",
            success: function (response) {
                if (response.nonuser) {
                    Swal.fire({
                        title: "Bạn cần đăng nhập để thực hiện tính năng này",
                        icon: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Sign in",
                        showCancelButton: true
                    }).then(res => {
                        if (res.value) {
                            location.href = "http://localhost:3000/user/signin"
                        }
                    })
                } 
                else if (response.empty) {
                    Swal.fire({
                        title: "Danh sách ưa thích rỗng !",
                        icon: "warning",
                        timer: 1000
                    })
                } else {
                    var length = response.length || 0;
                    $('.cart-items').html(length)
                    cartOverlay.classList.add("transparentBcg");
                    cartDOM.classList.add("showCart");
                }
            }
        });

    }
    cartLogic() {

    }
}
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    ui.setupApp();
    ui.cartLogic();
})

function deleteitem(id) {
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/deleteitem",
        data: {
            id
        },
        dataType: "json",
        success: function (response) {
            if (response.check) {
                Swal.fire({
                    title: "Xóa thành công",
                    icon: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 1000
                }).then(() => {
                    const ui = new UI();
                    ui.hideCart();
                    window.location.reload();
                })
            }
        }
    });
}


//add to cart
function addtolist(index) {
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/product/addtolist",
      data: {
        idproduct: index
      },
      dataType: "json",
      success: function (response) {
        if (response.nonuser) {
          Swal.fire({
            title: "Bạn cần đăng nhập để thực hiện tính năng này",
            showConfirmButton: true,
            confirmButtonText: "Sign in",
            showCancelButton: true,
            icon: "warning",
            timer: 3000

          }).then(result => {
            if (result.value) {
              location.href = "http://localhost:3000/user/signin"
            }
          })
        } else if (response.isowner) {
          Swal.fire({
            title: "Lỗi",
            text: "Bạn là người bán sản phẩm này",
            icon: "warning",
            timer: 1000
          })
        } else if (response.inlist) {
          Swal.fire({
            title: "Sản phẩm này đã có sẵn trong dánh sách ưa thích",
            showConfirmButton: false,
            cancelButtonText: "I Know",
            showCancelButton: true,
            icon: "warning",
            timer: 2000
          })
        } else if (response.result) {
          Swal.fire({
            text: "Thêm vào danh sách ưa thích thành công",
            icon: "success",
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500
          }).then(()=>{
            window.location.reload();
          })
        }

      }
    });
  }