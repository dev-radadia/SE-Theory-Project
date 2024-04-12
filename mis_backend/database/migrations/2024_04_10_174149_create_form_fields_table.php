<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   
        // Create the 'administrator' table with the required columns
        Schema::create('administrator', function (Blueprint $table) {
            $table->string('question');
            $table->enum('type', ['text', 'image', 'file', 'radio', 'checkbox']);
            $table->json('options')->nullable();
            $table->enum('applicable_to', ['student', 'employee', 'both']);

            // Define the composite primary key in the same blueprint
            $table->primary(['question', 'applicable_to']);
        });

        // Create an empty 'employee_data' table
        Schema::create('employee_data', function (Blueprint $table) {
            $table->id();
        });

        // Create an empty 'student_data' table
        Schema::create('student_data', function (Blueprint $table) {
            $table->id();
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('form_fields');
    }
};
