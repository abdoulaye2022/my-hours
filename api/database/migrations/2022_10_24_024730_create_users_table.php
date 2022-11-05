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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('firstname', 50)->nullable(false);
            $table->string('lastname', 50)->nullable(false);
            $table->string('gender', 20)->nullable(true);
            $table->string('country', 50)->nullable(true);
            $table->string('province', 50)->nullable(true);
            $table->string('city', 50)->nullable(true);
            $table->string('bio', 255)->nullable(true);
            $table->string('email', 50)->nullable(false)->unique();
            $table->integer('new_user')->default(0);
            $table->string('lang_app', 2)->default('fr');
            $table->integer('is_admin')->default(0);
            $table->text('password')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
