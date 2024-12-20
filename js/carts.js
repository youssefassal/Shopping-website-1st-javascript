let ProductsInCart = localStorage.getItem("ProductsInCart");
let allProducts = document.querySelector(".cartproducts-container");
let cartIcon = document.querySelector(".shopping_cart");

if (window.location.pathname.includes("cart.html")) {
    cartIcon.style.display = "none";
}

if (ProductsInCart) {
    let items = JSON.parse(ProductsInCart);
    drawCartProducts(items);
}

function drawCartProducts(products) {
    let groupedProducts = groupProductsById(products);
    let y = groupedProducts.map(function (item) {
        return `
            <div class="cartproduct" data-id="${item.id}">
                <div class="cartproduct-img-div">
                    <img src="${item.imageUrl}" class="cartproduct-img" alt="" width="50">
                </div>

                <div class="cartproduct-info-div">
                    <h2 class="cartproduct-name">Product: ${item.title}</h2>
                    <h2 class="cartproduct-category">Category: ${item.category}</h2>
                    <h2 class="cartproduct-price">Price: ${item.price}</h2>
                </div>

                <div class="cartproduct-btns-div">
                    <span class="cartproduct-amount">${item.quantity}</span>
                    <button class="plus" onClick="updateQuantity(${item.id}, 'increase')"><i class="fas fa-plus"></i></button>
                    <button class="minus" onClick="updateQuantity(${item.id}, 'decrease')"><i class="fas fa-minus"></i></button>
                    <button class="removefromcart" onClick="removefromCart(${item.id})">Remove</button>
                </div>
            </div>
        `;
    }).join("");

    allProducts.innerHTML = y;

    updateCartBadge();
}

function groupProductsById(products) {
    let grouped = {};

    products.forEach(item => {
        if (grouped[item.id]) {
            grouped[item.id].quantity += 1;
        } else {
            grouped[item.id] = { ...item, quantity: 1 };
        }
    });

    return Object.values(grouped);
}

function removefromCart(id) {
    let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    addedItem = addedItem.filter(item => item.id !== id);
    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));

    drawCartProducts(addedItem);
    updateCartBadge();
    updateTotalPrice()
}

function updateQuantity(id, action) {
    let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    let itemIndex = addedItem.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        if (action === 'increase') {
            let choosenItem = addedItem[itemIndex];
            addedItem.push({ ...choosenItem });
            
        } else if (action === 'decrease') {
            addedItem.splice(itemIndex, 1);

            if (!addedItem.some(item => item.id === id)) {
                addedItem = addedItem.filter(item => item.id !== id);
            }
        }
    }

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));
    drawCartProducts(addedItem);
    updateCartBadge();
    updateMainPageCartView(addedItem);
    updateTotalPrice();

}

function updateCartBadge() {
    let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    let badgenum = document.querySelector(".badge");

    if (addedItem.length > 0) {
        badgenum.style.display = "block";
        badgenum.innerHTML = addedItem.length;
    } else {
        badgenum.style.display = "none";
    }

    updateMainPageCartView(addedItem);
}

function updateMainPageCartView(addedItem) {
    let cartProductDiv = document.querySelector(".carts_products div");
    cartProductDiv.innerHTML = "";
    let groupedProducts = groupProductsById(addedItem);
    

    groupedProducts.forEach(item => {
        cartProductDiv.innerHTML += `<p>${item.title} (${item.quantity})</p>`;
    });
}

function addToCart(id) {
    let addedItem = JSON.parse(localStorage.getItem("ProductsInCart")) || [];
    let choosenItem = products.find(item => item.id === id);

    addedItem.push({ ...choosenItem });

    localStorage.setItem("ProductsInCart", JSON.stringify(addedItem));

    drawCartProducts(addedItem);
    updateCartBadge();
    updateTotalPrice()
}

window.addEventListener('storage', function(event) {
    if (event.key === 'ProductsInCart' || event.key === 'cartUpdated') {
        let ProductsInCart = localStorage.getItem("ProductsInCart");
        if (ProductsInCart) {
            let items = JSON.parse(ProductsInCart);
            drawCartProducts(items);
        }
    }
});

let checkout = document.querySelector(".check-title");

function updateTotalPrice() {
    let ProductsInCart = localStorage.getItem("ProductsInCart");
    if (ProductsInCart) {
        let items = JSON.parse(ProductsInCart);
        let totalPrice = items.reduce((total, item) => {
            let price = parseFloat(item.price.replace('$', ''));
            return total + price;
        }, 0);
        checkout.textContent = "Total price: $" + totalPrice.toFixed(2);
    }
}

updateTotalPrice()