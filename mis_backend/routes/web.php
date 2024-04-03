<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormFieldController;

Route::post('/api/form-fields', [FormFieldController::class, 'addField']);
