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
        Schema::create('administrator', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->enum('type', ['text', 'image', 'file', 'radio', 'checkbox']);
            $table->json('options')->nullable();
            $table->enum('applicable_to', ['student', 'employee', 'both']);
        });

        Schema::create('employee_data', function (Blueprint $table) {
            $table->id();
        });

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
