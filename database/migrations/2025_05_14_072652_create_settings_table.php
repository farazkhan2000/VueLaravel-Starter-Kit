<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id('setting_id');
            $table->foreignId('user_id')->constrained('users', 'id');
            $table->string('business_name');
            $table->string('email');
            $table->string('contact');
            $table->string('logo')->nullable();
            $table->text('address');
            $table->string('city');
            $table->string('province');
            $table->string('country');
            $table->string('zip_code');
            $table->string('theme_mode');
            $table->boolean('is_sidebar')->default(true);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('settings');
    }
};
