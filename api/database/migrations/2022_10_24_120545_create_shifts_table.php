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
        Schema::create('shifts', function (Blueprint $table) {
            $table->id();
            $table->float('hours_shift', 2, 2);
            $table->dateTime('date_shift');
            $table->string('location');
            $table->unsignedBigInteger('job_id');
            $table->unsignedBigInteger('employer_id');
            $table->foreign('job_id')->references('id')->on('jobs');
            $table->foreign('employer_id')->references('id')->on('employers');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shifts');
    }
};
