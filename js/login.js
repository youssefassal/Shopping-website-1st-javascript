let email = document.getElementById("inputemail")
let password = document.getElementById("inputpassword")
let loginBtn = document.querySelector(".sign_in")
let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")

loginBtn.addEventListener("click" , function (e){

    e.preventDefault()

    if (email.value === "" || password.value ===""){
        alert("please fill data")
    }else{
        if(getEmail && getEmail.trim() === email.value.trim() && getPassword && getPassword.trim() === password.value){
            setTimeout ( function() {
                window.location = "index.html"
            } , 1500)
        }else{
            alert("wrong email or password")
        }
    }
})