<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdTimingHoursTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_timing_hours';

    /**
     * Run the migrations.
     * @table md_timing_hours
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('day', 45)->nullable();
            $table->string('from_hour', 45)->nullable();
            $table->string('to_hour', 45)->nullable();
            $table->integer('number_of_visit')->nullable();
            $table->unsignedBigInteger('policlinic_id');

            $table->index(["policlinic_id"], 'fk_md_timing_hours_md_policlinics1_idx');
            $table->nullableTimestamps();


            $table->foreign('policlinic_id', 'fk_md_timing_hours_md_policlinics1_idx')
                ->references('id')->on('md_policlinics')
                ->onDelete('no action')
                ->onUpdate('no action');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists($this->tableName);
     }
}
