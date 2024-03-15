<?php

header('Content-Type: application/json');

// Decode the received JSON data
$data = json_decode(file_get_contents('php://input'), true);

// Initialize a response array
$response = [
    'success' => false,
    'data' => null,
    'debug' => '',
    'connection' => ''
];

// try {
//     // Connection using PDO
//     $conn = new PDO("sqlsrv:server = tcp:scounting7127.database.windows.net,1433; Database = scouting_7127", "CloudSAcaf36d4a", "3HKEkfjD3Q@!S#r9"); //CloudSAcaf36d4a
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//     $response['connection'] = 'Connected to database successfully';

//     // Assuming $data is an array of teams
//     foreach ($data as $team) {
//         $columns = array_keys($team);
//         $placeholders = array_map(function($value) { return '?'; }, $team);
//         $sql = "INSERT INTO teams (" . implode(", ", $columns) . ") VALUES (" . implode(", ", $placeholders) . ")";
        
//         $stmt = $conn->prepare($sql);
//         if ($stmt->execute(array_values($team))) {
//             $response['success'] = true;
//             $response['data'][] = 'Inserted: ' . json_encode($sql);
//         } else {
//             $response['debug'] = true;
//             $response['data'][] = 'Inserted: ' . json_encode($sql);
//         }
//     }
// } catch (PDOException $e) {
//     $response['debug'] = 'Error connecting to SQL Server.';
//     $response['data'] = $e->getMessage();
// } catch (Exception $e) {
//     $response['debug'] = 'An error occurred.';
//     $response['data'] = $e->getMessage();
// }

echo json_encode($response);
?>
