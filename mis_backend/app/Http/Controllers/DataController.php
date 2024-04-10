<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DataController extends Controller
{
    public function receiveData(Request $request)
    {
        $data = $request->all();

        return response()->json([
            'message' => 'Data received successfully!'
        ]);
    }
}
