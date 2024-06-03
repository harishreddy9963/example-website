// script.js

let cartItems = [];

// script.js

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (searchTerm === '') {
            // If the search term is empty, display all products
            showAllProducts();
        } else {
            // Filter products based on the search term
            filterProducts(searchTerm);
        }
    });
});

function showAllProducts() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.style.display = 'block';
    });
}

function filterProducts(searchTerm) {
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const productName = product.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchTerm)) {
            // If product name contains the search term, display the product
            product.style.display = 'block';
        } else {
            // Otherwise, hide the product
            product.style.display = 'none';
        }
    });
}


function addToCart(product) {
    const existingItemIndex = cartItems.findIndex(item => item.product === product);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ product: product, quantity: 1 });
    }
    renderCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    renderCart();
}

function incrementQuantity(index) {
    cartItems[index].quantity++;
    renderCart();
}

function decrementQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        renderCart();
    }
}

function renderCart() {
    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';
    cartItems.forEach((item, index) => {
        const li = document.createElement('li');
        const productName = document.createElement('span');
        productName.textContent = `${item.product} x `;
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.onchange = function() {
            const newQuantity = parseInt(quantityInput.value);
            if (!isNaN(newQuantity) && newQuantity >= 1) {
                cartItems[index].quantity = newQuantity;
                renderCart();
            }
        };
        const decrementBtn = document.createElement('button');
        decrementBtn.textContent = '-';
        decrementBtn.onclick = function() {
            decrementQuantity(index);
        };
        const incrementBtn = document.createElement('button');
        incrementBtn.textContent = '+';
        incrementBtn.onclick = function() {
            incrementQuantity(index);
        };
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = function() {
            removeFromCart(index);
        };
        li.appendChild(productName);
        li.appendChild(quantityInput);
        li.appendChild(decrementBtn);
        li.appendChild(incrementBtn);
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
}

function checkout() {
    if (cartItems.length === 0) {
        alert('Your shopping cart is empty. Please add items before proceeding to checkout.');
        return;
    }
    
    const name = prompt('Please enter your name:');
    if (name === null) return;
    if (!isValidName(name)) {
        alert('Please enter a valid name (alphabets and spaces only).');
        return;
    }
    const phoneNumber = prompt('Please enter your phone number:');
    if (phoneNumber === null) return;
    if (!isValidPhoneNumber(phoneNumber)) {
        alert('Please enter a valid phone number (10 digits only).');
        return;
    }
    const address = prompt('Please enter your address:');
    if (address === null) return;
    if (!isValidAddress(address)) {
        alert('Please enter your address.');
        return;
    }
    const cartDetails = cartItems.map(item => `${item.product} x ${item.quantity}`).join('\n');

    const confirmOrder = confirm(`Name: ${name}\nPhone Number: ${phoneNumber}\nAddress: ${address}\n\nCart:\n${cartDetails}\n\nClick OK to confirm order.`);
    if (confirmOrder) {
        sendEmail(name, phoneNumber, address, cartDetails);
    }
}

function sendEmail(name, phoneNumber, address, cartDetails) {
    const subject = encodeURIComponent("New Order");
    const body = encodeURIComponent(
        `Name: ${name}\nPhone Number: ${phoneNumber}\nAddress: ${address}\n\nCart:\n${cartDetails}`
    );
    const mailtoLink = `mailto:eharishreddy9963@gmail.com?subject=${subject}&body=${body}`;

    // Open user's default email client
    window.location.href = mailtoLink;
}

document.addEventListener('DOMContentLoaded', function() {
    const cart = document.getElementById('cart');
    const cartToggle = document.getElementById('cart-toggle');
    cart.classList.add('collapsed');
    cartToggle.classList.add('collapsed');

    // Add event listener to hide cart when clicking outside
    document.body.addEventListener('click', function(event) {
        const cart = document.getElementById('cart');
        const cartToggle = document.getElementById('cart-toggle');
        if (!cart.contains(event.target) && !cartToggle.contains(event.target)) {
            cart.classList.add('collapsed');
            cartToggle.classList.add('collapsed');
        }
    });

    // Add event listener to expand collapsed cart when clicked
    cart.addEventListener('click', function() {
        cart.classList.remove('collapsed');
        cartToggle.classList.remove('collapsed');
    });

    // Show cart by default
    setTimeout(() => {
        cart.classList.remove('collapsed');
        cartToggle.classList.remove('collapsed');
    }, 500);
});

function isValidName(name) {
    return /^[a-zA-Z\s]+$/.test(name);
}

function isValidPhoneNumber(phoneNumber) {
    return /^\d{10}$/.test(phoneNumber);
}

function isValidAddress(address) {
    return address.trim() !== '';
}

function toggleCart() {
    const cart = document.getElementById('cart');
    cart.classList.toggle('collapsed');
    const cartToggle = document.getElementById('cart-toggle');
    cartToggle.classList.toggle('collapsed');
}
