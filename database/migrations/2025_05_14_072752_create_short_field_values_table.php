<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('short_field_values', function (Blueprint $table) {
            $table->id('short_field_value_id');
            $table->foreignId('field_id')->constrained('fields', 'field_id');
            $table->foreignId('table_id')->constrained('tables', 'table_id');
            $table->string('value_data');
            $table->foreignId('added_by')->constrained('users', 'id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('short_field_values');
    }
};
