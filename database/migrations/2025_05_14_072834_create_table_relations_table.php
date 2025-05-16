<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('table_relations', function (Blueprint $table) {
            $table->id('relation_id');
            $table->foreignId('table_one_id')->constrained('tables', 'table_id');
            $table->string('relation_type');
            $table->foreignId('table_two_id')->constrained('tables', 'table_id');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('table_relations');
    }
};
