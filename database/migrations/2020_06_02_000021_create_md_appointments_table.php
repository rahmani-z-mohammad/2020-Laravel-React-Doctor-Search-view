<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdAppointmentsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_appointments';

    /**
     * Run the migrations.
     * @table md_appointments
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('appointment_date', 45);
            $table->integer('number_of_patient');
            $table->enum('status', ['Pending', 'Approved', 'Rejected']);
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('timing_hour_id');
            $table->string('approve_date', 20)->nullable();

            $table->index(["timing_hour_id"], 'fk_md_appointments_md_timing_hours1_idx');

            $table->index(["user_id"], 'fk_appointments_dct_users2_idx');
            $table->nullableTimestamps();


            $table->foreign('user_id', 'fk_appointments_dct_users2_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('timing_hour_id', 'fk_md_appointments_md_timing_hours1_idx')
                ->references('id')->on('md_timing_hours')
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
