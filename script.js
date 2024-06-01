// Array to store cart items
let cartItems = [];

// Function to add a product to the cart
function addToCart(product) {
    const existingItemIndex = cartItems.findIndex(item => item.product === product);
    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
    } else {
        cartItems.push({ product: product, quantity: 1 });
    }
    renderCart();
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    renderCart();
}

// Function to increment the quantity of a product in the cart
function incrementQuantity(index) {
    cartItems[index].quantity++;
    renderCart();
}

// Function to decrement the quantity of a product in the cart
function decrementQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        renderCart();
    }
}

// Function to render the cart items
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

// Function to handle checkout
function checkout() {
    const name = prompt('Please enter your name:');
    if (name === null) return;
    const phoneNumber = prompt('Please enter your phone number:');
    if (phoneNumber === null) return;
    const address = prompt('Please enter your address:');
    if (address === null) return;
    const cartDetails = cartItems.map(item => `${item.product} x ${item.quantity}`).join('\n');
    const message = `Name: ${name}\nPhone Number: ${phoneNumber}\nAddress: ${address}\n\nCart:\n${cartDetails}`;
    const confirmation = confirm(`Are you sure you want to place this order?\n\n${message}`);
    if (confirmation) {
        sendEmail(name, phoneNumber, address, cartDetails);
    }
}

// Function to send email
function sendEmail(name, phoneNumber, address, cartDetails) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "send_email.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                alert(xhr.responseText);
            } else {
                alert("Failed to send email!");
            }
        }
    };
    xhr.send(`name=${encodeURIComponent(name)}&phoneNumber=${encodeURIComponent(phoneNumber)}&address=${encodeURIComponent(address)}&cartDetails=${encodeURIComponent(cartDetails)}`);
}

// Event listener to scroll up
window.addEventListener('scroll', function() {
    var scrollPosition = window.pageYOffset;

    if (scrollPosition > 200) {
        document.querySelector('.back-to-top').style.display = 'block';
    } else {
        document.querySelector('.back-to-top').style.display = 'none';
    }
});

// Event listener to scroll to top
document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
