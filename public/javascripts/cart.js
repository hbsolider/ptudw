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
        
        cartBtn.addEventListener('click',this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart);
    }
    hideCart() {
        cartOverlay.classList.remove("transparentBcg");
        cartDOM.classList.remove("showCart");
    }
    showCart() {
        //get list 
        console.log('hihi')
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/user/getmylist",
            dataType: "json",
            success: function (response) {
                if(response.nonuser){
                    Swal.fire({
                        title:"Bạn cần đăng nhập để thực hiện tính năng này",
                        icon: "warning",
                        showConfirmButton: true,
                        confirmButtonText: "Sign in",
                        showCancelButton: true
                    }).then(res=>{
                        if(res.value){
                            location.href= "http://localhost:3000/user/signin"
                        }
                    })
                }else if(response.empty){
                    Swal.fire({
                        title:"Danh sách ưa thích rỗng !",
                        icon: "warning",
                        timer: 1000
                    })
                }else{
                    var length = response.length||0;
                    $('.cart-items').html(length)
                    cartOverlay.classList.add("transparentBcg");
                    cartDOM.classList.add("showCart");
                }
            }
        });
        
    }
    cartLogic(){

    }
}
document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    ui.setupApp();
    ui.cartLogic();
})
function deleteitem(id){
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/user/deleteitem",
        data: {id},
        dataType: "json",
        success: function (response) {
            if(response.check){
                Swal.fire({
                    title:"Xóa thành công",
                    icon: "success",
                    showCancelButton:false,
                    showConfirmButton:false,
                    timer:1000
                }).then(()=>{
                    const ui = new UI();
                    ui.hideCart();
                    window.location.reload();
                })
            }
        }
    });
}