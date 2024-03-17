<?php
// Enable error reporting for debugging (remove or change settings in production)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Database connection details
$dbHost = '';
$dbName = '';
$dbUser = '';
$dbPassword = '';

try {
    $conn = new PDO("sqlsrv:Server=$dbHost;Database=$dbName", $dbUser, $dbPassword);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected successfully to the database.";
    
    // Optional: Perform a simple query to test
    $sql = "SELECT TOP 1 * FROM Teams"; // Replace 'your_table' with an actual table name
    $stmt = $conn->query($sql);
    
    // Fetch and display the first row of the table
    if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<pre>" . print_r($row, true) . "</pre>";
    } else {
        echo "No data found.";
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
