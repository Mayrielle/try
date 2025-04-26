<?php
// Include config file
require_once "config.php";

// Select all news items ordered by date (most recent first)
$sql = "SELECT * FROM news ORDER BY date DESC";
$result = mysqli_query($conn, $sql);

$news_items = array();

if (mysqli_num_rows($result) > 0) {
    // Output data of each row
    while($row = mysqli_fetch_assoc($result)) {
        $news_items[] = $row;
    }
}

// Return as JSON
header('Content-Type: application/json');
echo json_encode($news_items);

// Close connection
mysqli_close($conn);
?>