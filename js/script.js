let userInfo = document.getElementById("user_info");
let userData = document.getElementById("user");
let links = document.getElementById("links");

if (localStorage.getItem("email")) {
    links.remove();
    userInfo.style.display = "flex";
    userData.innerHTML = "Welcome " + localStorage.getItem("firstName") + " " + localStorage.getItem("lastName");
}

let logOutBtn = document.querySelector("#logout");
logOutBtn.addEventListener("click", function () {
    localStorage.clear();
    setTimeout(function () {
        window.location = "login.html";
    }, 1500);
});

let allProducts = document.querySelector(".products-container");
let products = [
    { id: 1, title: "Logitech G PRO X Wireless", price: "129$", category: "Gaming headset", imageUrl: "images/pro-wireless-headset.png" },
    { id: 2, title: "Logitech G432 Wired Gaming", price: "32$", category: "Gaming headset", imageUrl: "images/logi head.png" },
    { id: 3, title: "Logitech G Pro Wireless", price: "54$", category: "Gaming mouse", imageUrl: "images/pro-wireless.png" },
    { id: 4, title: "Razer Viper V3 Pro Wireless", price: "149$", category: "Gaming mouse", imageUrl: "images/razer mouse.png" },
    { id: 5, title: "Logitech G915 TKL", price: "148$", category: "Gaming keyboard", imageUrl: "images/logi keybord.png" },
    { id: 6, title: "HyperX Alloy FPS RGB", price: "110$", category: "Gaming keyboard", imageUrl: "images/hyperx-alloy.png" },
];

function drawItems(filteredProducts) {
    let y = filteredProducts.map(function (item) {
        let buttonText = "Add to cart";
        let buttonClass = "addtocart";

        let addedItem = getCartItems();
        let isInCart = addedItem.some(cartItem => cartItem.id === item.id);
        if (isInCart) {
            buttonText = "Remove from cart";
            buttonClass = "removefromcart-indexpage";
        }

        return `
            <div class="product">
                <div class="product-img-div">
                    <img src="${item.imageUrl}" class="product-img" alt="#" width="300">
                </div>
                <div class="product-info-div">
                    <h2 class="product-name">Product: ${item.title}</h2>
                    <h2 class="product-price">Price: ${item.price}</h2>
                    <h2 class="product-category">Category: ${item.category}</h2>
                </div>
                <div class="product-btns-div">
                    <button class="${buttonClass}" onClick="toggleCart(${item.id})">${buttonText}</button>
                    <i class="fa fa-heart favourite"></i>
                </div>
            </div>
        `;
    }).join('');

    allProducts.innerHTML = y;
}

drawItems(products);

function getCartItems() {
    return localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];
}

function toggleCart(id) {
    let addedItem = getCartItems();
    let choosenItem = products.find(item => item.id === id);

    let existingItemIndex = addedItem.findIndex(item => item.id === id);

    if (existingItemIndex !== -1) {
        addedItem.splice(existingItemIndex, 1);
    } else {
        choosenItem.quantity = 1;
        addedItem.push(choosenItem);
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawItems(products);
    updateCartBadge();
}

function updateCartBadge() {
    let addedItem = getCartItems();
    let badgenum = document.querySelector(".badge");
    badgenum.style.display = "block";
    badgenum.innerHTML = addedItem.length;
}

function updateCartView() {
    let cartProductDiv = document.querySelector(".carts_products div");
    let addedItem = getCartItems();
    cartProductDiv.innerHTML = "";
    addedItem.forEach(item => {
        cartProductDiv.innerHTML += `
            <div class="cart-item">
                <div class="title">${item.title}</div>
                <div class="cart-item-quantity">${item.quantity}</div>
            </div>
        `;
    });
}

let shoppingcartIcon = document.querySelector(".shopping_cart");
shoppingcartIcon.addEventListener("click", function() {
    let cartsProducts = document.querySelector(".carts_products");
    cartsProducts.style.display = cartsProducts.style.display === "block" ? "none" : "block";
});

let searchInput = document.querySelector(".form-input");
let searchSelect = document.querySelector(".form-select");

function filterProducts() {
    let searchTerm = searchInput.value.toLowerCase();
    let searchByCategory = searchSelect.value == "2";

    let filteredProducts = products.filter(item => {
        if (searchByCategory) {
            return item.category.toLowerCase().includes(searchTerm);
        } else {
            return item.title.toLowerCase().includes(searchTerm);
        }
    });

    drawItems(filteredProducts);
}

searchInput.addEventListener("input", filterProducts);
searchSelect.addEventListener("change", filterProducts);
drawItems(products);