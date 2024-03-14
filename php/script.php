<?php
session_start();
require __DIR__ . "/AreaChecker.php";

date_default_timezone_set('Europe/Moscow');

if (!isset($_SESSION["data"])) {
    $_SESSION["data"] = array();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo 'Несоответствие метода.';
    return;
}

$x = $_POST["x"];
$y = $_POST["y"];
$r = $_POST["r"];


function validate_number($val, $min, $max){
    return isset($val) && is_numeric($val) && ($val>=$min) && ($val<=$max);
}

if(validate_number($x,-5,3) && validate_number($y,-2,4) && validate_number($r,1,3)){
    $result = (check_triangle_area($x, $y, $r) || check_rectangle_area($x, $y, $r) || check_circle_area($x, $y, $r)) ? "Точка попала в область" : "Вы промахнулись";
    $currentTime = date('Y-m-d H:i:s');
    $executionTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];


    $newResult = array(
        'x' => $x,
        'y' => $y,
        'r' => $r,
        'result' => $result,
        'currtime' => $currentTime,
        'executionTime' => $executionTime
    );

    array_push($_SESSION['data'], $newResult);

    foreach ($_SESSION['data'] as $resElem) {
        echo "<tr align=\"center\">";
        echo "<td>" . $resElem['x'] . "</td>";
        echo "<td>" . $resElem['y'] . "</td>";
        echo "<td>" . $resElem['r'] . "</td>";
        echo "<td>" . $resElem['result'] . "</td>";
        echo "<td>" . $resElem['currtime'] . "</td>";
        echo "<td>" . $resElem['executionTime'] . "</td>";
        echo "</tr>";
    }
   
}else {
    http_response_code(422);
    
    echo "Введите корректные данные.";
    return;
}
?>