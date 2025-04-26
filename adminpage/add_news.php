<?php
// Include authentication check
require_once "auth_check.php";

// Include config file
require_once "config.php";

// Define variables and initialize with empty values
$title = $subtitle = $date = $description = $image_url = "";
$title_err = $subtitle_err = $date_err = $description_err = $image_url_err = "";

// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Validate title
    if(empty(trim($_POST["title"]))){
        $title_err = "Please enter a title.";
    } else{
        $title = trim($_POST["title"]);
    }
    
    // Validate subtitle
    if(empty(trim($_POST["subtitle"]))){
        $subtitle_err = "Please enter a subtitle.";
    } else{
        $subtitle = trim($_POST["subtitle"]);
    }
    
    // Validate date
    if(empty(trim($_POST["date"]))){
        $date_err = "Please enter a date.";
    } else{
        $date = trim($_POST["date"]);
    }
    
    // Validate description
    if(empty(trim($_POST["description"]))){
        $description_err = "Please enter a description.";
    } else{
        $description = trim($_POST["description"]);
    }
    
    // Validate image URL
    if(empty(trim($_POST["image_url"]))){
        $image_url_err = "Please enter an image URL.";
    } else{
        $image_url = trim($_POST["image_url"]);
    }
    
    // Check input errors before inserting into database
    if(empty($title_err) && empty($subtitle_err) && empty($date_err) && empty($description_err) && empty($image_url_err)){
        
        // Check if we're updating or adding new
        if(!empty($_POST["id"])) {
            // Update existing news
            $sql = "UPDATE news SET title = ?, subtitle = ?, description = ?, image_url = ?, date = ? WHERE id = ?";
            
            if($stmt = mysqli_prepare($conn, $sql)){
                // Bind variables to the prepared statement as parameters
                mysqli_stmt_bind_param($stmt, "sssssi", $param_title, $param_subtitle, $param_description, $param_image_url, $param_date, $param_id);
                
                // Set parameters
                $param_title = $title;
                $param_subtitle = $subtitle;
                $param_description = $description;
                $param_image_url = $image_url;
                $param_date = $date;
                $param_id = trim($_POST["id"]);
                
                // Attempt to execute the prepared statement
                if(mysqli_stmt_execute($stmt)){
                    // Record updated successfully. Redirect to dashboard
                    header("location: admin-news.php");
                    exit();
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
        } else {
            // Insert new news
            $sql = "INSERT INTO news (title, subtitle, description, image_url, date) VALUES (?, ?, ?, ?, ?)";
            
            if($stmt = mysqli_prepare($conn, $sql)){
                // Bind variables to the prepared statement as parameters
                mysqli_stmt_bind_param($stmt, "sssss", $param_title, $param_subtitle, $param_description, $param_image_url, $param_date);
                
                // Set parameters
                $param_title = $title;
                $param_subtitle = $subtitle;
                $param_description = $description;
                $param_image_url = $image_url;
                $param_date = $date;
                
                // Attempt to execute the prepared statement
                if(mysqli_stmt_execute($stmt)){
                    // Records created successfully. Redirect to dashboard
                    header("location: admin-news.php");
                    exit();
                } else{
                    echo "Oops! Something went wrong. Please try again later.";
                }
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($conn);
}
?>