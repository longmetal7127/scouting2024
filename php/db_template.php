<?php

/*
TODO: 
FOR THE PUSH FUNCTION
    Add check to see if team globalid exists and update instead of insert
    Add check that the team data being updated is more recent then the data in the database
    
FOR THE SYNC FUNCTION
    Add check to make sure we are not syncing duplicate data (timestamps everywhere) back to the ipads or whatever
    Add check to make sure we are not syncing old data back to the . . .    

BOTH
    How to handle deletes
*/

header('Content-Type: application/json');

// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Decode the received JSON data
$data = json_decode(file_get_contents('php://input'), true);

// Initialize a response array
$response = [
    'success' => false,
    'data' => null,
    'debug' => '',
    'connection' => ''
];

try {
    $localEnvFile = __DIR__ . '/.local';

    // Check if the file exists
    if (file_exists($localEnvFile)) {
        // The file exists, so we're in a local development environment
        // Set your local database connection settings
        $dbHost = '';
        $dbName = '';
        $dbUser = '';
        $dbPassword = '';
        $response['connection'] = 'Local DB Connected';
    } else {
        // The file does not exist, so we're in the production environment
        // Set your production database connection settings
        $dbHost = '';
        $dbName = '';
        $dbUser = '';
        $dbPassword = '';
        $response['connection'] = 'Production DB Connected';
    }

    // Proceed with the database connection using the determined settings
    try {
        $conn = new PDO("sqlsrv:Server=$dbHost;Database=$dbName", $dbUser, $dbPassword);
        // Set the PDO error mode to exception
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        $response['debug'] = 'Connection failed: ' . $e->getMessage();
        echo json_encode($response);
    }

//     // Assuming $data is an array of teams, each with 'globalid' and 'timestamp'
    foreach ($data as $team) {
        // Check if a record with the same globalid and timestamp already exists
        $checkSql = "SELECT COUNT(*) FROM teams WHERE globalid = ? AND remoteid = ?";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->execute([$team['globalid'], $team['indexid']]);
        $exists = $checkStmt->fetchColumn() > 0;

        if (!$exists) {
            // Proceed with your insert if no existing record is found
            $columns = array_keys($team);
            $placeholders = array_map(function($value) { return '?'; }, $team);
            $sql = "INSERT INTO teams (" . implode(", ", $columns) . ") VALUES (" . implode(", ", $placeholders) . ")";
            
            $stmt = $conn->prepare($sql);
            if ($stmt->execute(array_values($team))) {
                $response['success'] = true;
                $response['data'][] = 'Inserted: ' . json_encode($team);
            } else {
                $response['debug'] = true;
                $response['data'][] = 'Failed to insert: ' . json_encode($team);
            }
        } else {
            // Handle the case where the record exists. You might want to skip or update the record.
            $response['data'][] = 'Record already exists for globalid ' . $team['globalid'] . ' at timestamp ' . $team['indexid'];
        }
    }
} catch (PDOException $e) {
    $response['debug'] = 'Error connecting to SQL Server.';
    $response['data'] = $e->getMessage();
    echo json_encode($response);
} catch (Exception $e) {
    $response['debug'] = 'An error occurred.';
    $response['data'] = $e->getMessage();
}

echo json_encode($response);
?>
