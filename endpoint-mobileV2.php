<?php

class Conexion{
	public static function Conectar(){
		define('servidor','');
		define('nombre_bd','');
		define('usuario', '');
		define('password', '');
        $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8');
		try{
			$conexion = new PDO("mysql:host=".servidor.";dbname=".nombre_bd, usuario, password, $opciones);
			return $conexion;
		}catch(Exception $e){
			die("El error de conexión es: ".$e->getMessage());
		}
	}
}

$objeto = new Conexion();
$conexion = $objeto->Conectar();

$EncodedData=file_get_contents('php://input');
$DecodedData=json_decode($EncodedData, true);
$opcion = (isset($DecodedData['opcion'])) ? $DecodedData['opcion'] : '';
$usuario = (isset($DecodedData['usuario'])) ? $DecodedData['usuario'] : '';
$password = (isset($DecodedData['password'])) ? $DecodedData['password'] : '';
$entidad = (isset($DecodedData['entidad'])) ? $DecodedData['entidad'] : '';
$codEntidades = (isset($DecodedData['codEntidades'])) ? implode(",", $DecodedData['codEntidades'])  : 'null';


switch($opcion){  
    /*-----LOGIN-----*/ 
    case 1:
        $esCM = strtolower(substr($usuario, 0, 2));
        if($esCM == "cm"){
            $response = array(
                "status" => "FAILED", 
                "message"=>"Usuario no registrado en el sistema");
            $responseJSON = json_encode($response); 
            print $responseJSON; 
        }else {
            $consulta = "SELECT au.usuario, ap.nombre, ae.codigo AS entidad
            FROM admin_USERS au
            INNER JOIN admin_PADRON ap ON au.idUsers = ap.userID
            INNER JOIN admin_ENTIDAD ae ON ae.idEntidad = ap.entidadID
            WHERE au.usuario = '$usuario' AND au.clave = '$password'";
            $resultado = $conexion->prepare($consulta);
            $resultado->execute();
            if($resultado->rowCount() >= 1){
                $data = $resultado->fetchAll(PDO::FETCH_ASSOC);
                $arrayEntidad = [];
                foreach ($data as $value) {
                    array_push($arrayEntidad, $value["entidad"]);
                };
                if(in_array("66", $arrayEntidad)){
                    $response = array(
                        "status" => "SUCCESS", 
                        "message"=>"Login correcto", 
                        "data" => array("usuario" => $data[0]["usuario"], 
                                        "nombre"=>$data[0]["nombre"], 
                                        "entidad"=>$arrayEntidad)
                    );
                    $responseJSON = json_encode($response); 
                    print $responseJSON;
                }else{
                    $response = array(
                        "status" => "FAILED", 
                        "message"=>"Este circulo medico no se encuentra asociado con la app");
                        $responseJSON = json_encode($response); 
                        print $responseJSON; 
                }
            }else{
                $response = array(
                    "status" => "FAILED", 
                    "message"=>"Usuario y/o contraseña incorrecta");
                $responseJSON = json_encode($response); 
                print $responseJSON; 
            }
        }
        break;
    /*-----NOVEDADES-----*/ 
    case 2:
        $consulta = "SELECT n.idnovedades, n.titulo, n.contenido, DATE_FORMAT(n.fecha,'%d/%m/%Y') AS fecha, 
        n.archivosnombres, n.archivosguardados, ae.nombre AS entidadNombre
        FROM novedades n
        INNER JOIN admin_ENTIDAD ae ON n.entidadID = ae.idEntidad
        WHERE ae.codigo IN ($codEntidades) AND YEAR(n.fecha) = YEAR(CURDATE()) ORDER BY n.fecha DESC;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($data);
    break;
    /*-----LIQUIDACIONES-----*/ 
    case 3:
        $consulta = "SELECT ae.codigo AS entidad, ac.nliq, DATE_FORMAT(ac.fliq, '%d/%m/%Y') AS fliq, ap.matricula, ac.submat, ac.tothon,
        ac.totgtos, ac.totiva, ac.totfact, ac.totff, ac.totgan, ac.totib, ac.totjub, ac.totrhon, ac.totrgtos, ac.totdeb, ac.totcred,
        ac.netoneg, ac.netopos
        FROM admin_CTROL ac
        INNER JOIN
        admin_PADRON ap ON ap.idPadron = ac.padronID
        INNER JOIN
        admin_ENTIDAD ae ON ae.idEntidad = ap.entidadID
        WHERE ap.matricula='$usuario' AND ac.fliq>= DATE_SUB(NOW(), INTERVAL 18 MONTH)
        ORDER BY ae.codigo, ac.nliq DESC ,ap.matricula, ac.submat ASC;";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($data);
    break;
    /*-----IMPORTES-----*/ 
    case 4:
        $consulta = "SELECT ac.totfact, ac.netopos, DATE_FORMAT(ff.fecha, '%d/%m/%Y') AS fecha
        FROM fecha_facturacion ff
        INNER JOIN
        admin_ENTIDAD ae ON ae.idEntidad = ff.entidadID
        INNER JOIN
        admin_PADRON ap ON ap.entidadID = ae.idEntidad
        INNER JOIN
        admin_CTROL ac ON ac.padronID = ap.idPadron
        WHERE ap.matricula='$usuario' AND ae.codigo='$entidad' ORDER BY fliq DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($data);
    break;
};

$conexion=null;

?>