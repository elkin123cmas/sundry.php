<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Ingresa tus datos para iniciar sesión</p>

<?php
include_once __DIR__ . "/../templates/alertas.php"
?>

<form action="/" class="formulario" method="POST">
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Ingresa tu Email..." name="email">

    </div>
    <div class="campo">
        <label for="password">Password</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña..." name="password">
    </div>
    <input type="submit" class="boton" value="Iniciar Sesión">
</form>
<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una.</a>
    <a href="/olvide">¿Olvidaste tu contraseña?</a>
</div>