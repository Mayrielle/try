<?php
// Include authentication check
require_once "auth_check.php";

// Include config file
require_once "config.php";

// Check if ID parameter was passed
if(isset($_GET["id"]) && !empty($_GET["id"])){
    
    // Prepare a delete statement
    $sql = "DELETE FROM news WHERE id = ?";
    
    if($stmt = mysqli_prepare($conn, $sql)){
        // Bind variables to the prepared statement as parameters
        mysqli_stmt_bind_param($stmt, "i", $param_id);
        
        // Set parameters
        $param_id = trim($_GET["id"]);
        
        // Attempt to execute the prepared statement
        if(mysqli_stmt_execute($stmt)){
            // Records deleted successfully. Return success
            echo json_encode(["success" => true]);
        } else{
            echo json_encode(["success" => false, "error" => "Error executing statement"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Error preparing statement"]);
    }
     
    // Close statement
    mysqli_stmt_close($stmt);
    
    // Close connection
    mysqli_close($conn);
} else{
    // ID parameter not valid
    echo json_encode(["success" => false, "error" => "Missing ID parameter"]);
}
?>