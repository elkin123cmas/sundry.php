<h1 class="nombre-pagina">Nuevos Servicios</h1>
<p class="descripcion-pagina">Llena todos los campos para añadir nuevos servicios</p>

<?php
include_once __DIR__ . '/../templates/barra.php';
?>
<?php
include_once __DIR__ . '/../templates/alertas.php';
?>

<form action="/servicios/crear" method="POST" class="formulario">
    <?php include_once __DIR__ . "/formulario.php"; ?>
    <input type="submit" value="Guardar Servicio" class="boton">
</form>