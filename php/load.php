<?php
session_set_cookie_params(0);
session_start();
if(isset($_SESSION['data'])){
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
}
?>