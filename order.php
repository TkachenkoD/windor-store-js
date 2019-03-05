<?php
if($_SERVER["REQUEST_METHOD"]=="POST"){
  $n = $_POST['userName'];
  $ph = $_POST['userPhone'];
  $it = $_POST['items'];
  $msg = "hi there";

  $msg = "First line of text\nSecond line of text";

  // use wordwrap() if lines are longer than 70 characters
  $msg = wordwrap($msg,70);

  // send email
  // mail("...@gmail.com","My subject",$msg);


  // echo "Users name $n";
// file_put_contents("apps.txt", "$n\n $ph\n $it\r\n", FILE_APPEND);

// mail('tkachenko.com@gmail.com', $n, $ph, $msg)
}
 ?>
