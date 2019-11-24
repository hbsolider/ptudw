function validateForm() {
    var email = document.getElementById("email"); 
    var password=document.getElementById("password");
    var pass_valid=document.getElementById("valid_password");
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
    var flag1=0;
    var flag2=0; 
    if(password.value != pass_valid.value)
    {
      flag1=1;
    }
    if(!filter.test(email.value))
      flag2=1;
      if( flag2==1){
      alert("Email nhập vào không hợp lệ");
      return false;
    }
    if(flag1==1)
    {
      alert("Password không khớp");
      return false;
    }
    if(flag2==0 && flag1==0){
      alert("Đăng kí tài khoản thành công!");
      return true;
    }
  }