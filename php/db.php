<?php

// Assuming you're sending data via POST and using JSON
$data = json_decode(file_get_contents('php://input'), true);

// Data received from JavaScript
$key1 = $data['key1'];
$key2 = $data['key2'];

// Database connection parameters
$serverName = "your_server.database.windows.net"; // Update with your server name
$connectionOptions = array(
    "Database" => "your_database_name", // Update with your database name
    "Uid" => "your_username", // Update with your username
    "PWD" => "your_password" // Update with your password
);

// Establishing connection
$conn = sqlsrv_connect($serverName, $connectionOptions);

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
