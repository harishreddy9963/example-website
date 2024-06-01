<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get form data
    $name = $_POST["name"];
    $phoneNumber = $_POST["phoneNumber"];
    $address = $_POST["address"];
    $cartDetails = $_POST["cartDetails"];

    // Construct email message
    $subject = "New Order from $name";
    $message = "Name: $name\nPhone Number: $phoneNumber\nAddress: $address\n\nCart:\n$cartDetails";

    // Set email headers
    $headers = "From: eharishreddy9963@email.com" . "\r\n" .
               "Reply-To: eharishreddy9963@email.com" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail("eharishreddy9963@gmail.com", $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email!";
    }
} else {
    echo "Method not allowed!";
}
?>
