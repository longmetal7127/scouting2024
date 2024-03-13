<?php

// Assuming you're sending data via POST and using JSON
$data = json_decode(file_get_contents('php://input'), true);

// Data received from JavaScript
$key1 = $data['key1'];
$key2 = $data['key2'];

// Database connection parameters
// $serverName = "scounting7127.database.windows.net"; // Update with your server name
// $connectionOptions = array(
//     "Database" => "scouting7127", // Update with your database name
//     "Uid" => "your_username", // Update with your username
//     "PWD" => "your_password" // Update with your password
// );

// // Establishing connection
// $conn = sqlsrv_connect($serverName, $connectionOptions);


try {
    $conn = new PDO("sqlsrv:server = tcp:scounting7127.database.windows.net,1433; Database = scouting7127", "CloudSAcaf36d4a", "3P&tLBL7Xc7L6R5p");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
    print("Error connecting to SQL Server.");
    die(print_r($e));
}

// SQL Server Extension Sample Code:
$connectionInfo = array("UID" => "CloudSAcaf36d4a", "pwd" => "{your_password_here}", "Database" => "scouting7127", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
$serverName = "tcp:scounting7127.database.windows.net,1433";
$conn = sqlsrv_connect($serverName, $connectionInfo);

if($conn) {
    // SQL query to insert data
    $sql = "INSERT INTO your_table_name (column1, column2) VALUES (?, ?)";
    
    // Preparing and executing the statement
    $params = array($key1, $key2);
    $stmt = sqlsrv_prepare($conn, $sql, $params);

    if(sqlsrv_execute($stmt)) {
        echo json_encode(array("message" => "Data inserted successfully."));
    } else {
        echo json_encode(array("message" => "Error in inserting data."));
    }
} else {
    die(print_r(sqlsrv_errors(), true));
}

?>
