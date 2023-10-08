<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mailTwo = new PHPMailer(true);
$mailTwo->Charset = 'UTF-8';
$mailTwo->setLanguage('uk', 'phpmailer/language/');
$mailTwo->IsHTML(true);

$mailTwo->setFrom('info@fls.guru', 'користувач');
$mailTwo->addAddress('pavelseravin@gmail.com');
$mailTwo->Subject = 'привіт, ось моє повідомлення';

// $hand = "права";
// if($_POST['hand'] == "left"){
//     $hand = "ліва";
// }

$bodyTwo = '<h1>А ось і замовлення</h1>';

// if (trim(!empty($_POST['name']))) {
//     $body .= '<p><strong>Ім’я:</strong> '.$_POST['name'].'</p>';
// }

// if (trim(!empty($_POST['phone']))) {
//     $body .= '<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
// }
// if (trim(!empty($_POST['eyelashes']))) {
//     $body .= '<p><strong>Замовлені послуги:</strong><br> '.$_POST['eyelashes'].'</p>';
// }
// if (trim(!empty($_POST['eyebrow']))) {
//     $body .= '<p><strong>           </strong> '.$_POST['eyebrow'].'</p>';
// }
// if (trim(!empty($_POST['lamination']))) {
//     $body .= '<p><strong>           </strong> '.$_POST['lamination'].'</p>';
// }

// =========================================



if (trim(!empty($_POST['yourName']))) {
    $bodyTwo .= '<p><strong>Ім’я:</strong> '.$_POST['yourName'].'</p>';
}

if (trim(!empty($_POST['yourEmail']))) {
    $bodyTwo .= '<p><strong>E-mail:</strong> '.$_POST['yourEmail'].'</p>';
}
if (trim(!empty($_POST['message']))) {
    $bodyTwo .= '<p><strong>Повідомлення:</strong><br> '.$_POST['message'].'</p>';
}


$mailTwo->Body = $bodyTwo;

if (!$mailTwo->send()) {
    $messageTwo = 'Помилка з відправкою!';
} else {
    $messageTwo = 'Дані відправлені';
}
$responseTwo = ['message' => $messageTwo];
header('Content-type: application/json');
echo json_encode($responseTwo);


?>