<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;

class Email
{
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        // Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '5ba80b64bde139'; // Usa tu usuario real de Mailtrap
        $mail->Password = 'a8450067839d08'; // Usa tu contraseña real de Mailtrap

        $mail->setFrom('cuentas@appsalon.com', 'AppSalon.com');
        $mail->addAddress($this->email, $this->nombre); // Enviar al email del usuario
        $mail->Subject = 'Confirma tu cuenta';

        $mail->CharSet = 'UTF-8';

        // Definir el cuerpo del correo en HTML con estilos
        $contenidoHTML = "<html><body style='background-color: #1e1e1e; color: #ffffff; font-family: Arial, sans-serif;'>";
        $contenidoHTML .= "<div style='max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;'>";
        $contenidoHTML .= "<h2 style='color: #ffffff;'>Hola " . htmlentities($this->nombre, ENT_QUOTES, 'UTF-8') . ",</h2>";
        // $contenidoHTML .= "<p>Has creado tu cuenta en <strong>Tatto</strong>, solo debes presionar en el siguiente enlace para confirmarla:</p>";
        $contenidoHTML .= "<p>Has creado tu cuenta en <strong>Tatto</strong>, solo debes presionar en el siguiente enlace para confirmarla:</p>";
        $contenidoHTML .= "<a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "' style='display: inline-block; margin-top: 20px; padding: 10px 20px; color: #ffffff; background-color: #288500; text-decoration: none; border-radius: 5px;'>Confirmar cuenta</a>";
        $contenidoHTML .= "<p style='margin-top: 20px;'>Si tú no solicitaste esta confirmación, puedes ignorar este mensaje.</p>";
        $contenidoHTML .= "</div></body></html>";

        // Definir el cuerpo del correo en texto plano
        $contenidoTextoPlano = "Hola " . $this->nombre . ", has creado tu cuenta en Tatto, solo debes presionar en el siguiente enlace:\n\n";
        $contenidoTextoPlano .= "Presiona aquí: http://localhost:3000/confirmar-cuenta?token=" . $this->token . "\n\n";
        $contenidoTextoPlano .= "Si tú no solicitaste esta confirmación, puedes ignorar este mensaje.";

        // Configurar el cuerpo del correo
        $mail->isHTML(true); // Establecer que el correo contiene HTML
        $mail->Body = $contenidoHTML; // Establecer el cuerpo del correo en HTML
        $mail->AltBody = $contenidoTextoPlano; // Establecer el cuerpo del correo en texto plano

        // Enviar el mail
        if (!$mail->send()) {
            throw new \Exception('El mensaje no pudo ser enviado: ' . $mail->ErrorInfo);
        }
    }
    public function enviarInstrucciones()
    {

        // Crear el objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'sandbox.smtp.mailtrap.io';
        $mail->SMTPAuth = true;
        $mail->Port = 2525;
        $mail->Username = '5ba80b64bde139'; // Usa tu usuario real de Mailtrap
        $mail->Password = 'a8450067839d08'; // Usa tu contraseña real de Mailtrap

        $mail->setFrom('cuentas@appsalon.com', 'AppSalon.com');
        $mail->addAddress($this->email, $this->nombre); // Enviar al email del usuario
        $mail->Subject = 'Reestablece tu Contraseña';

        $mail->CharSet = 'UTF-8';

        // Definir el cuerpo del correo en HTML con estilos
        $contenidoHTML = "<html><body style='background-color: #1e1e1e; color: #ffffff; font-family: Arial, sans-serif;'>";
        $contenidoHTML .= "<div style='max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;'>";
        $contenidoHTML .= "<h2 style='color: #ffffff;'>Hola " . htmlentities($this->nombre, ENT_QUOTES, 'UTF-8') . ",</h2>";
        // $contenidoHTML .= "<p>Has creado tu cuenta en <strong>Tatto</strong>, solo debes presionar en el siguiente enlace para confirmarla:</p>";
        $contenidoHTML .= "<p>Has solicitado reestablecer tu contraseña, sigue el siguiente enlace para reestablecerlo.</p>";
        $contenidoHTML .= "<a href='http://localhost:3000/recuperar?token=" . $this->token . "' style='display: inline-block; margin-top: 20px; padding: 10px 20px; color: #ffffff; background-color: #288500; text-decoration: none; border-radius: 5px;'>Reestablecer Contraseña</a>";
        $contenidoHTML .= "<p style='margin-top: 20px;'>Si tú no solicitaste esta confirmación, puedes ignorar este mensaje.</p>";
        $contenidoHTML .= "</div></body></html>";

        // Definir el cuerpo del correo en texto plano
        $contenidoTextoPlano = "Hola " . $this->nombre . ",Has solicitado Tatto reestablecer tu contraseña, sigue el siguiente enlace para reestablecerlo.:\n\n";
        $contenidoTextoPlano .= "Presiona aquí: http://localhost:3000/recuperar?token=" . $this->token . "\n\n";
        $contenidoTextoPlano .= "Si tú no solicitaste esta confirmación, puedes ignorar este mensaje.";

        // Configurar el cuerpo del correo
        $mail->isHTML(true); // Establecer que el correo contiene HTML
        $mail->Body = $contenidoHTML; // Establecer el cuerpo del correo en HTML
        $mail->AltBody = $contenidoTextoPlano; // Establecer el cuerpo del correo en texto plano

        // Enviar el mail
        if (!$mail->send()) {
            throw new \Exception('El mensaje no pudo ser enviado: ' . $mail->ErrorInfo);
        }
        // $mail->send();
    }
}
