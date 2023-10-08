<?php 
/* Осуществляем проверку вводимых данных и их защиту от враждебных  
скриптов */ 
$your_name = htmlspecialchars($_POST["your_name"]); 
$email = htmlspecialchars($_POST["email"]); 
// $tema = htmlspecialchars($_POST["tema"]); 
$message = htmlspecialchars($_POST["messages"]); 
/* Устанавливаем e-mail адресата */ 
$myemail = "pavelseravin@gmail.com"; 
/* Проверяем заполнены ли обязательные поля ввода, используя check_input  
функцию */ 
$your_name = check_input($_POST["your_name"], "Введіть Ваше ім’я!"); 
// $tema = check_input($_POST["tema"], "Укажите тему сообщения!"); 
$email = check_input($_POST["email"], "Введіть Ваш e-mail!"); 
$message = check_input($_POST["message"], "Ви забули написати повідомлення!"); 
/* Проверяем правильно ли записан e-mail */ 
if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) 
{ 
show_error(" Е-mail адреси не існує"); 
} 
/* Создаем новую переменную, присвоив ей значение */ 
$message_to_myemail = "Привіт!  
Тобі залишили повідомлення"; 
/* Отправляем сообщение, используя mail() функцию */ 
$from  = "Ім’я відправника: $your_name \r\n E-mail: $email \r\n Текст повідомлення: $message  \r\n Reply-To: $email \r\n";  
mail($myemail, $message_to_myemail, $from); 
?> 
Ваше повідомлення надіслано
<?php 
/* Если при заполнении формы были допущены ошибки сработает  
следующий код: */ 
function check_input($data, $problem = "") 
{ 
$data = trim($data); 
$data = stripslashes($data); 
$data = htmlspecialchars($data); 
if ($problem && strlen($data) == 0) 
{ 
show_error($problem); 
} 
return $data; 
} 
function show_error($myError) 
{ 
?> 

Будь-ласка, виправте помилку:
<?php echo $myError; ?> 

<?php 
exit(); 
} 
?>

