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
