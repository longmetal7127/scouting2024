<?php
// Assuming you're sending data via POST and using JSON
$data = json_decode(file_get_contents('php://input'), true);
print('data: ' . $data);

// try {
//     $conn = new PDO("sqlsrv:server = tcp:scounting7127.database.windows.net,1433; Database = scouting7127", "CloudSAcaf36d4a", "3P&tLBL7Xc7L6R5p");
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// }
// catch (PDOException $e) {
//     print("Error connecting to SQL Server.");
//     die(print_r($e));
// }

// // SQL Server Extension Sample Code:
// $connectionInfo = array("UID" => "CloudSAcaf36d4a", "pwd" => "3P&tLBL7Xc7L6R5p", "Database" => "scouting7127", "LoginTimeout" => 30, "Encrypt" => 1, "TrustServerCertificate" => 0);
// $serverName = "tcp:scounting7127.database.windows.net,1433";
// $conn = sqlsrv_connect($serverName, $connectionInfo);

// if($conn) {

//     foreach ($data as $team) {
//         $columns = array_keys($team);
//         $values = array_map(function($value) {
//             if (is_string($value)) {
//                 $value = str_replace("'", "\\'", $value); // Escape single quotes
//                 return "'$value'";
//             } elseif (is_bool($value)) {
//                 return $value ? 'TRUE' : 'FALSE';
//             } elseif ($value === null) {
//                 return 'NULL';
//             }
//             return $value;
//         }, array_values($team));
        
//         print($columns);s
//         print($values);
// //     // SQL query to insert data
// //     $sql = "INSERT INTO your_table_name (column1, column2) VALUES (?, ?)";
    
// //     // Preparing and executing the statement
// //     $params = array($key1, $key2);
// //     $stmt = sqlsrv_prepare($conn, $sql, $params);

// //     if(sqlsrv_execute($stmt)) {
// //         echo json_encode(array("message" => "Data inserted successfully."));
// //     } else {
// //         echo json_encode(array("message" => "Error in inserting data."));
// //     }
// } else {
//     die(print_r(sqlsrv_errors(), true));
// }

?>
