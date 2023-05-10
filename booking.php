<?php
// Retrieve form data
$title = $_POST['title'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$email = $_POST['email'];
$checkin_date = $_POST['checkin_date'];
$checkout_date = $_POST['checkout_date'];
$num_adults = $_POST['adults'];
$num_children = $_POST['children'];
$room_type = $_POST['room_type'];
$card_type = $_POST['card_type'];
$card_number = $_POST['card_number'];
$card_expiry = $_POST['card_expiry'];
$cvv = $_POST['cvv'];

// Mask credit card number
$masked_card_number = str_repeat('*', 12) . substr($card_number, -4);

// Display confirmation message and user data
echo '<h1>Thank you, ' . $title . ' ' . $first_name . ' ' . $last_name . ', we have received your payment order and it will be processed shortly. Here are the details of your order:</h1>';

echo '<table>';
echo '<tr><td>Title</td><td>' . $title . '</td></tr>';
echo '<tr><td>First name</td><td>' . $first_name . '</td></tr>';
echo '<tr><td>Last name</td><td>' . $last_name . '</td></tr>';
echo '<tr><td>Email Address</td><td>' . $email . '</td></tr>';
echo '<tr><td>Check-in date</td><td>' . $checkin_date . '</td></tr>';
echo '<tr><td>Check-out date</td><td>' . $checkout_date . '</td></tr>';
echo '<tr><td>Number of adults</td><td>' . $num_adults . '</td></tr>';
echo '<tr><td>Number of children</td><td>' . $num_children . '</td></tr>';
echo '<tr><td>Room type</td><td>' . $room_type . '</td></tr>';
echo '<tr><td>Card type</td><td>' . $card_type . '</td></tr>';
echo '<tr><td>Card number</td><td>' . $masked_card_number . '</td></tr>';
echo '<tr><td>Card expiry</td><td>' . $card_expiry . '</td></tr>';
echo '<tr><td>CVV</td><td>***</td></tr>';
echo '</table>';

// Calculate the total amount to be paid
$total = calculate_total($checkin_date, $checkout_date, $num_adults, $num_children, $room_type);

echo '<p>Total amount to be paid: $' . $total . '</p>';
?>