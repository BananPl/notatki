<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
    .red{
        background-color:red;
    }
    table
     {
        border:1px solid black;
        border-collapse:collapse;
     }
    </style>
    <table>
        <tbody>
    <?php
    $x=240;
    $y=150;
    $x_p=$x/2;
    $y_p=$y/2;
for ($i=0; $i < $y; $i++) { 
    echo"<tr>";
    for($j=0; $j<$x; $j++){
        if(sqrt(pow($i-$y_p,2)+pow($j-$x_p,2))<=($x/4)){
            echo"<td class='red'></td>";
        }
        else{
            echo"<td></td>";
        }
        
    }
    echo "</tr>";
}
    ?>
    </tbody>
</table>
</body>
</html>