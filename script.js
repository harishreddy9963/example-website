let cartItems = [];

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
    const name = prompt('Please enter your name:');
    if (name === null) return;
    const phoneNumber = prompt('Please enter your phone number:');
    if (phoneNumber === null) return;
    const address = prompt('Please enter your address:');
    if (address === null) return;
    const cartDetails = cartItems.map(item => `${item.product} x ${item.quantity}`).join('\n');

    const confirmOrder = confirm(`Name: ${name}\nPhone Number: ${phoneNumber}\nAddress: ${address}\n\nCart:\n${cartDetails}\n\nClick OK to confirm order.`);
    if (confirmOrder) {
        sendEmail(name, phoneNumber, address, cartDetails);
    }
}

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

window.addEventListener('scroll', function() {
    var scrollPosition = window.pageYOffset;

    if (scrollPosition > 200) {
        document.querySelector('.back-to-top').style.display = 'block';
    } else {
        document.querySelector('.back-to-top').style.display = 'none';
    }
});

document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
