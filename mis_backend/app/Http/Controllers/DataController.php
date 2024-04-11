<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

function addToEmployee($col) {
    $colName = str_replace(' ', '_', $col["question"]);

    if ($col["type"] == "text") {
        DB::connection()->getPdo()->exec(
            "ALTER TABLE employee_data ADD {$colName} varchar(255)"
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
            "ALTER TABLE employee_data ADD {$col["question"]} ENUM({$enum})"
        );
    }
}

function addToStudent($col) {
    $colName = str_replace(' ', '_', $col["question"]);

    if ($col["type"] == "text") {
        DB::connection()->getPdo()->exec(
            "ALTER TABLE student_data ADD {$colName} varchar(255)"
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
            "ALTER TABLE student_data ADD {$col["question"]} ENUM({$enum})"
        );
    }
}

class DataController extends Controller
{
    public function receiveCols(Request $request)
    {
        $data = $request->all();

        foreach ($data as $col) {
            if ($col["applicableTo"] == "employee") {
                addToEmployee($col);
            }
            elseif ($col["applicableTo"] == "student") {
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
}
