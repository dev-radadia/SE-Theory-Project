<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormField;

class FormFieldController extends Controller
{
    public function addField(Request $request)
    {
        $validatedData = $request->validate([
            'question' => 'required|string',
            'type' => 'required|in:text,image,file',
            'options' => 'nullable|string',
            'applicable_to' => 'required|in:student,employee,both',
        ]);

        $field = FormField::create($validatedData);

        return response()->json(['message' => 'Field added successfully', 'field' => $field], 201);
    }
}
