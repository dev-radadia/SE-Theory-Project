<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFormFieldsTable extends Migration
{
    public function up()
    {
        Schema::create('form_fields', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->enum('type', ['text', 'image', 'file']);
            $table->text('options')->nullable();
            $table->enum('applicable_to', ['student', 'employee', 'both']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('form_fields');
    }
}
