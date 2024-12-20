let firstName = document.getElementById("inputfirstname")
let lastName = document.getElementById("inputlastname")
let email = document.getElementById("inputemail")
let password = document.getElementById("inputpassword")
let registerBtn = document.querySelector(".sign_up")

registerBtn.addEventListener("click" , function (e){

    e.preventDefault()

    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value ===""){
        alert("please fill data")
    }else{
        localStorage.setItem("firstName" , firstName.value)
        localStorage.setItem("lastName" , lastName.value)
        localStorage.setItem("email" , email.value)
        localStorage.setItem("password" , password.value)

        setTimeout ( function() {
            window.location = "login.html"
        } , 1500)
    }
})