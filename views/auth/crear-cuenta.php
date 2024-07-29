<h1 class="nombre-pagina">Crear Cuenta</h1>
<p class="descripcion-pagina">Completa tus datos para crear una cuenta</p>

<?php
include_once __DIR__ . "/../templates/alertas.php"
?>
<form action="/crear-cuenta" class="formulario" method="POST">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" name="nombre" placeholder="Escribe tu nombre..." value=<?php echo s($usuario->nombre) ?>>
    </div>
    <div class="campo">
        <label for="nombre">Apellido</label>
        <input type="text" id="apellido" name="apellido" placeholder="Escribe tu apellido..." value=<?php echo s($usuario->apellido) ?>>
    </div>
    <div class="campo">
        <label for="nombre">Teléfono</label>
        <input type="tel" id="telefono" name="telefono" placeholder="Escribe tu teléfono..." value=<?php echo s($usuario->telefono) ?>>
    </div>
    <div class="campo">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Escribe tu email..." value=<?php echo s($usuario->email) ?>>
    </div>
    <div class="campo">
        <label for="password">Contraseña</label>
        <input type="password" id="password" name="password" placeholder="Escribe tu contraseña...">
    </div>
    <input type="submit" value="Crear Cuenta" class="boton">
    <div class="acciones">
        <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
        <a href="/olvide">¿Olvidaste tu contraseña?</a>
    </div>
</form>