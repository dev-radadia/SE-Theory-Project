<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Function to add form skeleton data in the "administrator" table
function addToAdministrator($col) {

    // Encode array into json string
    $options = json_encode($col["options"]);

    // Try connecting to database and executing the sql query
    try {
        DB::connection()->getPdo()->exec(
            "INSERT INTO administrator (question, type, options, applicable_to) VALUES (" . "'" . "{$col["question"]}" . "', '" . "{$col["type"]}" . "', '" . "{$options}" . "', '" . "{$col["applicable_to"]}" . "')"
        );
    }

    // Will execute if the question in the form already exists
    catch (\PDOException $e) {
        echo "'" . "{$col["question"]}" . "' " . "question already exists in the form\n";
        return 0;
    }

    return 1;
}

// Function to build the "employee_data" table
function buildEmployee($col) {

    // Check whether the field type is 'text' or not
    if ($col["type"] == "text") {

        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE employee_data ADD `{$col["question"]}` varchar(255)"
            );
        }

        // Will execute if the column already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'employee_data' table\n";
        }
    }

    // Check whether the field type is 'checkbox' or not
    elseif ($col["type"] == "checkbox") {

        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE employee_data ADD `{$col["question"]}` json"
            );
        }

        // Will execute if the column already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'employee_data' table\n";
        }
    }

    // Check whether the field type is 'radio' or not
    elseif ($col["type"] == "radio") {

        // Declaring an empty string variable to store all the options
        $enum_options = "";

        // Iterating through all the "options" present in json object
        for ($key = 0, $size = count($col["options"]); $key < $size; $key++) {

            // Appending each option to the '$enum_options' variable
            $enum_options .= "'";
            $enum_options .= $col["options"][$key];
            $enum_options .= "'";
            
            // Inserting a comma between each option
            if ($key < $size-1) {
                $enum_options .= ", ";
            }
        }

        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE employee_data ADD `{$col["question"]}` ENUM({$enum_options})"
            );
        }

        // Will execute if the column already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'employee_data' table\n";
        }
    }

    // If the field type is other than 'text', 'checkbox', 'radio' i.e. 'image' or 'file'
    else {
        
        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE employee_data ADD `{$col["question"]}` longblob"
            );
        }

        // Will execute if the column already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'employee_data' table\n";
        }
    }
}

// Function to build the Student Data table
function buildStudent($col) {

    // Check whether the field type is 'text' or not
    if ($col["type"] == "text") {

        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE student_data ADD `{$col["question"]}` varchar(255)"
            );
        }

        // Will execute if the column already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'student_data' table\n";
        }
    }

    // Check whether the field type is 'checkbox' or not
    elseif ($col["type"] == "checkbox") {

        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE student_data ADD `{$col["question"]}` json"
            );
        }

        // Will execute if the column already already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'student_data' table\n";
        }
    }

    // Check whether the field type is 'radio' or not
    elseif (($col["type"] == "radio")) {

        // Declaring an empty string variable which will be later used to execute the sql query
        $enum_options = "";

        // Iterating through all the "options" present in json object
        for ($key = 0, $size = count($col["options"]); $key < $size; $key++) {

            // Appending each option to the '$enum_options' variable
            $enum_options .= "'";
            $enum_options .= $col["options"][$key];
            $enum_options .= "'";
            
             // Inserting a comma between each option
            if ($key < $size-1) {
                $enum_options .= ", ";
            }
        }

        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE student_data ADD `{$col["question"]}` ENUM({$enum_options})"
            );
        }

        // Will execute if the column already already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'student_data' table\n";
        }
    }

    // If the field type is other than 'text', 'checkbox', 'radio' i.e. 'image' or 'file'
    else {
        
        // Try connecting to database and executing the sql query
        try {
            DB::connection()->getPdo()->exec(
                "ALTER TABLE student_data ADD `{$col["question"]}` longblob"
            );
        }

        // Will execute if the column already exists
        catch (\PDOException $e) {
            echo "'" . "{$col["question"]}" . "' " . "column already exists in 'student_data' table\n";
        }
    }
}

// Function to add user form data in the "employee_data" table
function addToEmployee($cols, $vals) {

    // Connecting to database and executing the sql query
    DB::connection()->getPdo()->exec(
        "INSERT INTO employee_data ({$cols}) VALUES ($vals)"
    );
}

// Function to add user form data in the "student_data" table
function addToStudent($cols, $vals) {
    
    // Connecting to database and executing the sql query
    DB::connection()->getPdo()->exec(
        "INSERT INTO student_data ({$cols}) VALUES ($vals)"
    );
}

class DataController extends Controller
{   
    // Function to receive form skeleton data from the frontend
    public function receiveCols(Request $request)
    {   
        // Convert the received json object into an associative array
        $data = $request->all();

        // Iterating through each element of the array
        foreach ($data as $col) {

            // Calling the function to add data in the "administrator" table and if the data already exists in the table then ending the iteration
            if (!addToAdministrator($col)) {

                // Skipping to the next iteration
                continue;
            }

            // Check whether the field is applicable to only 'employee'
            if ($col["applicable_to"] == "employee") {

                // Calling the function to add a new column in the "employee_data" table
                buildEmployee($col);
            }

            // Check whether the field is applicable to only 'student'
            elseif ($col["applicable_to"] == "student") {

                // Calling the function to add a new column in the "student_data" table
                buildStudent($col);
            }

            // The field is applicable to both 'employee' and 'student'
            else {

                // Calling the function to add a new column in the "employee_data" table
                buildEmployee($col);

                // Calling the function to add a new column in the "student_data" table
                buildStudent($col);
            }
        }

        // Respond if successfully received data from the frontend
        return response()->json([
            'message' => 'Cols received successfully!'
        ]);
    }

    // Function to receive user form data from the frontend
    public function receiveData(Request $request)
    {   
        // Convert the received json object into an associative array
        $data = $request->all();

        // Declaring a boolean variable (will help in knowing whether the data received belongs to employee form or student form)
        $employee = TRUE;

        // Checking whether the data received belongs to student form
        if($data[0]["applicable_to"] == "student") {
            $employee = FALSE;
        }

        // Declaring an empty string variable to store all column names (form fields)
        $cols = "";

        // Declaring an empty string variable to store all data entries (form values)
        $vals = "";

        // Declaring a boolean variable to keep track of the first iteration of the array
        $first = TRUE;

        // Iterating through each element of the array
        foreach ($data as $col) {

            // Checking whether it is the first iteration or not
            if ($first) {

                // Unsetting the '$first' variable
                $first = FALSE;

                // Skipping to the next iteration
                continue;
            }

            // Appending each field name to the '$cols' variable
            $cols .= "`";
            $cols .= $col["question"];
            $cols .= "`";
            $cols .= ", ";

            // Check whether the field type is 'checkbox' or not
            if($col["type"] == "checkbox") {

                // Encode array into json string
                $val = json_encode($col["response"]);

                // Appending each field value to the '$vals' variable
                $vals .= "'";
                $vals .= $val;
                $vals .= "'";
                $vals .= ", ";
            }

            // Check whether the field type is 'image' or not
            elseif($col["type"] == "image") {

                // Creating a variable to store the Base64 Decoding of the received image
                $image = base64_decode($col["response"]);

                // Appending each field value to the '$vals' variable
                $vals .= "'";
                $vals .= $image;
                $vals .= "'";
                $vals .= ", ";
            }

            // Check whether the field type is 'file' or not
            elseif($col["type"] == "file") {

                // Creating a variable to store the Base64 Decoding of the received file
                $file = base64_decode($col["response"]);

                // Appending each field value to the '$vals' variable
                $vals .= "'";
                $vals .= $file;
                $vals .= "'";
                $vals .= ", ";
            }

            // If the field type is other than 'checkbox' and 'image' i.e. 'text' or 'radio'
            else {

                // Appending each field value to the '$vals' variable
                $vals .= "'";
                $vals .= $col["response"];
                $vals .= "'";
                $vals .= ", ";
            }
        }

        // Remove the last two extra characters ", " from the '$cols' variable
        $cols = substr($cols, 0, -2);

        // Remove the last two extra characters ", " from the '$vals' variable
        $vals = substr($vals, 0, -2);

        // Checking whether the data received belongs to the employee form or not
        if ($employee) {

            // Calling the function to add data in the "employee_data" table
            addToEmployee($cols, $vals);
        }

        // If the data received belongs to the student form
        else {

            // Calling the function to add data in the "student_data" table
            addToStudent($cols, $vals);
        }
        
        // Respond if successfully received data from the frontend
        return response()->json([
            'message' => 'Data received successfully!'
        ]);
    }

    // Function to send form skeleton data (to build the user form) to the frontend
    public function sendCols()
    {   
        // Connecting to database and fetching entire table data from the "administrator" table
        $rows = DB::table('administrator')->get();

        // Declaring an empty array variable to store all rows (form fields)
        $cols = [];

        // Iterating through each row
        foreach ($rows as $row) {

            // Declaring an empty associative array variable to store each row (form field)
            $col = [];

            // Iterating though each element of the row (where '$key' variable holds the column name and '$value' variable holds the data entry)
            foreach ($row as $key => $value) {

                // Check whether the column name is "options"
                if ($key == "options") {

                    // Decode json object into array
                    $options = json_decode($value);

                    // Appending the "column name - data entry" pair into the '$col' variable
                    $col[$key] = $options;
                }

                // If the column name is other than "options"
                else {
                    
                    // Appending the "column name - data entry" pair into the '$col' variable
                    $col[$key] = $value;
                }
            }

            // Appending the '$col' variable into the '$cols' variable
            $cols[] = $col;
        }

        // Encode array into a json object
        $jsonData = json_encode($cols);

        // Return the json object to the frontend
        return $jsonData;
    }
}
