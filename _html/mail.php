<?php
if($_POST){
   $to = 'name@domain.com' ;     
   $subject = 'Website contact';   //set the subject of email.
   $headers  = 'MIME-Version: 1.0' . "\r\n";
   $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
   $message = "<table>
   				<tr>
   					<td><strong>Subject:</strong></td><td>".$_POST['subject']."</td>
               	</tr>
               	<tr>
					<td><strong>Message:</strong></td><td>".$_POST['message']."</td>
               	</tr>
               </table>";
   mail($to, $subject, $message, $headers);
}
?>