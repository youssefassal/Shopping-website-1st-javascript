let userInfo = document.getElementById("user_info")
let userData = document.getElementById("user")
let links = document.getElementById("links")

if(localStorage.getItem("email")){
    links.remove()
    userInfo.style.display = "flex"
    userData.innerHTML ="Welcome " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName")
}
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click" , function(){
    localStorage.clear()
    setTimeout(function (){
        window.location = "login.html"
    } , 1500)
})