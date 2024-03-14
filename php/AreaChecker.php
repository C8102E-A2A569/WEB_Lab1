<?php

    function check_triangle_area($x, $y, $r){
        return $x<=0 && $y>=0 && ($x >= $r / 2) && ($y <= $r) && (2 * $x + $y <= $r);
    }

    function check_rectangle_area($x, $y, $r){
        return $x>=0 && $y>=0 && $x<=$r && $y<=$r/2;
    }

    function check_circle_area($x, $y, $r){
        return $x<=0 && $y<=0 && ($x * $x + $y * $y) <= ($r * $r);
    }
?>
