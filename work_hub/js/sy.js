$(function() {
document.getElementById("login").onclick=function(){show("loginCont")
console.log("111111111")
}
document.getElementById("register").onclick=function(){show("regCont")}
function show(id){
    var shower=document.getElementById(id)
    shower.style.display="block";
    document.getElementsByClassName("mask")[0].style.display="block"
    }
function hide(id){
    var hider=document.getElementById(id)
    hider.style.display="none";
    }
  document.getElementsByClassName("mask")[0].onclick=function () {
      hide("mask")
      hide("regCont")
      hide("loginCont")
  }
        $("#back").click(function() {
            var timer = setInterval(function() {
                document.documentElement.scrollTop -= 50;
                if (document.documentElement.scrollTop <= 0) {
                    clearInterval(timer);

                }
            }, 50)

        });

    })
    // 检测localStorage
    // window.onload = function checkStorage() {
    //     var user = localStorage.getItem("username");
    //     if (user != "" && user != null) {
    //         alert(user + "欢迎您再次回来");
    //     } else {
    //         user = prompt("你好，请输入你的名字:", "");
    //         if (user != "" && user != null) {
    //             localStorage.setItem("username", user);
    //         }
    //     }
    // };