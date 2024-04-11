<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

function addToAdministrator($col) {
    $options = json_encode($col["options"]);

    DB::connection()->getPdo()->exec(
        "INSERT INTO administrator (question, type, options, applicable_to) VALUES (" . "'" . "{$col["question"]}" . "', '" . "{$col["type"]}" . "', '" . "{$options}" . "', '" . "{$col["applicable_to"]}" . "')"
    );
}

function addToEmployee($col) {
    if ($col["type"] == "text") {
        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD `{$col["question"]}` varchar(255)"
        );
    }
    elseif ($col["type"] == "checkbox") {
        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD `{$col["question"]}` json"
        );
    }
    else {
        $enum = "";
        for ($key = 0, $size = count($col["options"]); $key < $size; $key++) {
            $enum .= "'";
            $enum .= $col["options"][$key];
            $enum .= "'";
            
            if ($key < $size-1) {
                $enum .= ", ";
            }
        }

        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD `{$col["question"]}` ENUM({$enum})"
        );
    }
}

function addToStudent($col) {
    if ($col["type"] == "text") {
        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD `{$col["question"]}` varchar(255)"
        );
    }
    elseif ($col["type"] == "checkbox") {
        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD `{$col["question"]}` json"
        );
    }
    else {
        $enum = "";
        for ($key = 0, $size = count($col["options"]); $key < $size; $key++) {
            $enum .= "'";
            $enum .= $col["options"][$key];
            $enum .= "'";
            
            if ($key < $size-1) {
                $enum .= ", ";
            }
        }

        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD `{$col["question"]}` ENUM({$enum})"
        );
    }
}

class DataController extends Controller
{
    public function receiveCols(Request $request)
    {
        $data = $request->all();

        foreach ($data as $col) {
            addToAdministrator($col);

            if ($col["applicable_to"] == "employee") {
                addToEmployee($col);
            }
            elseif ($col["applicable_to"] == "student") {
                addToStudent($col);
            }
            else {
                addToEmployee($col);
                addToStudent($col);
            }
        }

        return response()->json([
            'message' => 'Cols received successfully!'
        ]);
    }

    public function receiveData(Request $request)
    {
        $data = $request->all();

        // DB::connection()->getPdo()->exec(
        // "INSERT INTO TABLE students_employees_data () VALUES ()"
        // );

        return response()->json([
            'message' => 'Data received successfully!'
        ]);
    }

    public function sendCols()
    {
        $rows = DB::table('administrator')->get();

        $cols = [];
        foreach ($rows as $row) {
            $col = [];
            foreach ($row as $key => $value) {
                if ($key == "options") {
                    $options = json_decode($value);
                    $col[$key] = $options;
                }
                else {
                    $col[$key] = $value;
                }
            }
            $cols[] = $col;
        }

        $jsonData = json_encode($cols);

        return $jsonData;
    }
}
