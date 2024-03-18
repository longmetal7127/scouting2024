<?php

/*

I created a few new pages
    /testing/dexie.html - displays dexie database contents
    /testing/deletedexie.html - deletes the local dexie db to avoid those can't upgrade issues
    /php/php/dbtest.php - if you set up a local environment on your computer this will test the connection to your local sql server (makes development alot faster)
    a few template files to the php folder - since we don't want to upload credentials to github we put those in file that we can put in our gitignore file and if someone wants to download the app they have something to work off of but not the credentials themselves
        since in order to need those credentials you have to be connected to the internet, we don't need those files to be on our local machine for offline use

TODO: 
FOR THE PUSH FUNCTION
    Add check to see if team globalid exists and update instead of insert
    Add check that the team data being updated is more recent then the data in the database
    
FOR THE SYNC FUNCTION
    Add check to make sure we are not syncing duplicate data (timestamps everywhere) back to the ipads or whatever
    Add check to make sure we are not syncing old data back to the . . .    

BOTH
    How to handle deletes

OTHER
    add timestamp field defaults
    split out submits according to new tables
    what fields are accoring to match and applied to team overall - which values are constant from match to match and which change over time
    initialize the match number and track it so a duplicate cannot be entered when inserting new match
    add new match to the homescreen for each team that links to tyhe match summary page for that team and creates a new match
    if you see any undefined in the db get rid of them (give a default value) undefined or NULL is bad news in databases
*/

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

try {
    $localEnvFile = __DIR__ . '/.local';

    // Check if the file exists
    if (file_exists($localEnvFile)) {
        // The file exists, so we're in a local development environment
        // Set your local database connection settings
        $dbHost = 'GOLD\GOLD';
        $dbName = 'scouting_7127';
        $dbUser = 'teams7127';
        $dbPassword = 'abcdefg123';
        $response['connection'] = 'Local DB Connected';
    } else {
        // The file does not exist, so we're in the production environment
        // Set your production database connection settings
        $dbHost = 'tcp:scounting7127.database.windows.net,1433;';
        $dbName = 'scouting_7127';
        $dbUser = 'CloudSAcaf36d4a';
        $dbPassword = '3HKEkfjD3Q@!S#r9';
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

    // Assuming $data is an array of teams, each with 'globalid' and 'timestamp'
    foreach ($data as $team) {
        // Check if a record with the same globalid and timestamp already exists
        $checkSql = "SELECT COUNT(*) FROM teams WHERE globalid = ? AND indexid = ?";
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
                 $response['sql'][] = 'sql ' . $sql;

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

$jsonResponse = json_encode($response);
if (json_last_error() !== JSON_ERROR_NONE) {
    // Log the error or handle it accordingly
    error_log('JSON encode error: ' . json_last_error_msg());
    // Optionally, set a response indicating an error
    $jsonResponse = json_encode(['error' => 'Internal server error']);
}
echo $jsonResponse;
?>
