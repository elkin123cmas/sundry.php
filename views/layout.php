<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tattoo Dark</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/build/css/app.css">
</head>

<body>
    <div class="contenedor-app">
        <div class="imagen">
            <div class="neon-line"></div>
            <div class="text-center" id="text-center">Prepárate para lo eterno</div>
        </div>
        <div class="app">
            <?php echo $contenido; ?>
        </div>
    </div>
    <?php
    echo $script ?? '';
    ?>
    <script>
        let index = 0;
        const textos = [
            "Prepárate para lo eterno",
            "Explora la eternidad",
            "Descubre lo inmortal",
            "Vive lo inolvidable"
        ];

        function cambiarTexto() {
            const textoElement = document.getElementById('text-center');
            textoElement.textContent = textos[index];
            index = (index + 1) % textos.length;
        }

        document.addEventListener('DOMContentLoaded', function() {
            cambiarTexto();
            setInterval(cambiarTexto, 5000);
        });
    </script>
</body>


</html>