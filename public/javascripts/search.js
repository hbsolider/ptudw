function SendRequestClickCheckBoxs() {
    var checkboxes = document.getElementsByName("boxes");
    var urlSend = window.location.href;
    if (urlSend === "http://localhost:3000/product")
      urlSend += "?";
    else urlSend += "&";
    var selected = document.getElementById("mySelect").value;
    if (selected === "priceDESC") urlSend += "&" + "priceASC" + "=false";
    else urlSend += "&" + selected + "=true";
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {
        urlSend += "&" + checkboxes[i].id + "=true";
      }
      checkboxes[i].addEventListener("change", function () {
        if (checkboxes[i].checked == true)
          sessionStorage.setItem(`${checkboxes[i].id}`, "checked");
        else sessionStorage.setItem(`${checkboxes[i].id}`, "unchecked");
      });
    }
    window.location.replace(urlSend);
  }
  
  function selectedSort() {
    var checkboxes = document.getElementsByName("boxes");
    var urlSend = window.location.href;
    if (urlSend === "http://localhost:3000/product")
      urlSend += "?";
    else urlSend += "&";
    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked == true) {
        urlSend += "&" + checkboxes[i].id + "=true";
      }
    }
    var selected = document.getElementById("mySelect").value;
    if (selected === "priceDESC") urlSend += "priceASC=false";
    else urlSend += selected  + "=true";
    window.location.replace(urlSend);
  }
  
  function clearBoxes() {
    var input = sessionStorage.getItem("draft");
    sessionStorage.clear();
    sessionStorage.setItem("draft", input);
  }
  
  