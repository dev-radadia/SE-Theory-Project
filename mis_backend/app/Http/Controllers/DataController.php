<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DataController extends Controller
{
    public function receiveData(Request $request)
    {
        $data = $request->all();

        $cols = [];
        foreach ($data as $key => $value) {
            array_push($cols, $value);
            echo $value;
        }

        foreach ($cols as $col) {
            DB::connection()->getPdo()->exec(
            "ALTER TABLE students_employees_data ADD {$col} varchar(255)"
            );
        }

        return response()->json([
            'message' => 'Data received successfully!'
        ]);
    }
}
