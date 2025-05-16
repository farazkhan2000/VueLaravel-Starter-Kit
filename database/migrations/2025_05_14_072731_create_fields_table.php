<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('fields', function (Blueprint $table) {
            $table->id('field_id');
            $table->foreignId('table_id')->constrained('tables', 'table_id');
            $table->string('field_name');
            $table->string('field_type');
            $table->integer('field_length')->nullable();
            $table->boolean('is_nuitable')->default(false);
            $table->string('default_value')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fields');
    }
};
