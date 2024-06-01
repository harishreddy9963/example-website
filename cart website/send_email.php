<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phoneNumber = $_POST['phoneNumber'];
    $address = $_POST['address'];
    $cartDetails = $_POST['cartDetails'];

    $to = "eharishreddy9963@gmail.com";
    $subject = "New Order";
    $message = "Name: $name\nPhone Number: $phoneNumber\nAddress: $address\n\nCart:\n$cartDetails";
    $headers = "From: Your Website <eharishreddy9963@example.com>";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email!";
    }
}
?>
