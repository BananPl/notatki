<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<?php
echo "<table><tbody>";
for($i=0; $i<30;$i++){
    echo "<tr>";
    for($j=0; $j<30;$j++){
        if(rand(0,2)==1){
            echo "<td class='black'></td>";
        }
        else{
            echo "<td class='white'></td>";
        }
    }
    echo "</tr>";
}
echo"</table></tbody>";
?>
</body>
</html>
<style>
table{
    border-collapse: collapse;
}
td{
    width: 10px;
    height: 10px;
}
.white{
    background-color: white;
}
.black{
    background-color:black;
}
</style>