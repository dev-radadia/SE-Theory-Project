<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

// Function to add form skeleton data in the "administrator" table
function addToAdministrator($col) {

    // Encode associative array into json object
    $options = json_encode($col["options"]);

    // Connecting to database and executing the sql query
    DB::connection()->getPdo()->exec(
        "INSERT INTO administrator (question, type, options, applicable_to) VALUES (" . "'" . "{$col["question"]}" . "', '" . "{$col["type"]}" . "', '" . "{$options}" . "', '" . "{$col["applicable_to"]}" . "')"
    );
}

// Function to build the "employee_data" table
function addToEmployee($col) {

    // Check whether the field type is 'text' or not
    if ($col["type"] == "text") {

        // Connecting to database and executing the sql query
        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD `{$col["question"]}` varchar(255)"
        );
    }

    // Check whether the field type is 'checkbox' or not
    elseif ($col["type"] == "checkbox") {

        // Connecting to database and executing the sql query
        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD `{$col["question"]}` json"
        );
    }

    // If the field type is other than 'text' and 'checckbox' i.e. 'radio'
    else {

        // Declaring an empty string variable to store all the options
        $enum_options = "";

        // Iterating through all the "options" present in json object
        for ($key = 0, $size = count($col["options"]); $key < $size; $key++) {

            // Appending each option to the 'enum_options' variable
            $enum_options .= "'";
            $enum_options .= $col["options"][$key];
            $enum_options .= "'";
            
            // Inserting a comma between each option
            if ($key < $size-1) {
                $enum_options .= ", ";
            }
        }

        // Connecting to database and executing the sql query
        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD `{$col["question"]}` ENUM({$enum_options})"
        );
    }
}

// Function to build the Student Data table
function addToStudent($col) {

    // Check whether the field type is 'text' or not
    if ($col["type"] == "text") {

        // Connecting to database and executing the sql query
        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD `{$col["question"]}` varchar(255)"
        );
    }

    // Check whether the field type is 'checkbox' or not
    elseif ($col["type"] == "checkbox") {

        // Connecting to database and executing the sql query
        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD `{$col["question"]}` json"
        );
    }

    // If the field type is other than 'text' and 'checckbox' i.e. 'radio'
    else {
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

        // Connecting to database and executing the sql query
        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD `{$col["question"]}` ENUM({$enum_options})"
        );
    }
}

class DataController extends Controller
{   
    // Function to receive form skeleton data from the frontend
    public function receiveCols(Request $request)
    {   
        // Convert the received json object into an associative array
        $data = $request->all();

        // Iterating through each element of the associative array
        foreach ($data as $col) {

            // Calling the function to add data in the "administrator" table
            addToAdministrator($col);

            // Check whether the field is applicable to only 'employee'
            if ($col["applicable_to"] == "employee") {

                // Calling the function to add a new column in the "employee_data" table
                addToEmployee($col);
            }

            // Check whether the field is applicable to only 'student'
            elseif ($col["applicable_to"] == "student") {

                // Calling the function to add a new column in the "student_data" table
                addToStudent($col);
            }

            // The field is applicable to both 'employee' and 'student'
            else {

                // Calling the function to add a new column in the "employee_data" table
                addToEmployee($col);

                // Calling the function to add a new column in the "student_data" table
                addToStudent($col);
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
