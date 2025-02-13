document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.npoint.io/d48587410594df0f5932")
        .then(response => response.json())
        .then(data => {
            console.log("API Data:", data);
            const productList = document.getElementById("product-list");

            data.forEach(product => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product");

                const img = document.createElement("img");
                img.src = product.food_image;
                img.alt = product.food_name;
                
                // Check if the image loads successfully
                img.onerror = function () {
                    console.warn(`Image not found: ${product.food_image}`);
                    productDiv.remove(); // Remove product if image is missing
                };

                const name = document.createElement("h3");
                name.textContent = product.food_name;

                const price = document.createElement("p");
                price.textContent = `₹${product.food_price}`;

                const addToCartButton = document.createElement("button");
                addToCartButton.textContent = "Add to Cart";
                addToCartButton.classList.add("add-to-cart");
                addToCartButton.dataset.id = product.food_id;
                addToCartButton.dataset.name = product.food_name;
                addToCartButton.dataset.price = product.food_price;

                addToCartButton.addEventListener("click", function () {
                    addToCart(product);
                });

                productDiv.appendChild(img);
                productDiv.appendChild(name);
                productDiv.appendChild(price);
                productDiv.appendChild(addToCartButton);

                productList.appendChild(productDiv);
            });
        })
        .catch(error => console.error("Error fetching API:", error));
});

// 🛒 Cart functionality
const cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.food_id === product.food_id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

// 🛒 Update cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear cart display

    let totalCost = 0;

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");

        itemDiv.innerHTML = `
            <p>${item.food_name} (x${item.quantity}) - ₹${(item.food_price * item.quantity).toFixed(2)}</p>
            <button class="remove-item" data-id="${item.food_id}">Remove</button>
        `;

        totalCost += item.food_price * item.quantity;
        cartItemsContainer.appendChild(itemDiv);
    });

    document.getElementById("total-cost").textContent = `₹${totalCost.toFixed(2)}`;

    // Remove items
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", function () {
            const foodId = parseInt(this.dataset.id);
            removeFromCart(foodId);
        });
    });
}

// 🗑 Remove item from cart
function removeFromCart(foodId) {
    const index = cart.findIndex(item => item.food_id === foodId);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCartDisplay();
    }
}


document.getElementById("checkout-btn").addEventListener("click", function () {
    const cartItems = document.getElementById("cart-items").innerHTML;
    const totalCost = document.getElementById("total-cost").textContent;

    if (cartItems.trim() === "") {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }

    alert(`Thank you for your purchase! Your total is ${totalCost}`);
    document.getElementById("cart-items").innerHTML = ""; // Clear cart
    document.getElementById("total-cost").textContent = "₹0"; // Reset total
});
