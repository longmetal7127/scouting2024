<?php
    $serverName = "scounting7127.database.windows.net"; // update me
    $connectionOptions = array(
        "Database" => "scounting7127", // update me
        "Uid" => "admin@CityofSpringfield377.onmicrosoft.com", // update me
        "PWD" => "3P&tLBL7Xc7L6R5p" // update me
    );
    //Establishes the connection
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    $tsql= "SELECT TOP 20 [UniqueID],[TeamName]
         FROM [scounting7127].[Teams]";
    $getResults= sqlsrv_query($conn, $tsql);
    echo ("Reading data from table" . PHP_EOL);
    if ($getResults == FALSE)
        echo (sqlsrv_errors());
    while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {
     echo ($row['CategoryName'] . " " . $row['ProductName'] . PHP_EOL);
    }
    sqlsrv_free_stmt($getResults);
?>