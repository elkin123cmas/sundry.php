<?php

namespace Controllers;

use Model\Cita;
use Model\CitaServicio;
use Model\Servicio;

class APIController
{
    public static function index()
    {
        $servicios = Servicio::all();
        echo json_encode($servicios);
    }

    public static function guardar()

    {
        //almacena las cita y devuelve el id
        $cita = new Cita($_POST);
        // var_dump($cita);

        $resultado = $cita->guardar();

        $id = $resultado['id'];
        //almacena los servicios con el id de las citas
        $idServicios = explode(",", $_POST['servicios']);
        foreach ($idServicios as $idServicio) {
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args);
            $citaServicio->guardar();
        }
        //retonarmos una respuesta
        // $respuesta = [
        //     'resultado' => $resultado
        // ];

        // echo json_encode($respuesta);
        echo json_encode(['resultado' => $resultado]);
    }
}
