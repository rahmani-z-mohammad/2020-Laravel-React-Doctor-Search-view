<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdDoctorsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_doctors';

    /**
     * Run the migrations.
     * @table md_doctors
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('gender', 6)->nullable();
            $table->enum('appointment_type', ['by call', 'by online', 'both'])->nullable();
            $table->string('website')->nullable();
            $table->unsignedBigInteger('doctor_id');
            $table->string('facebook')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->integer('num_views')->nullable();

            $table->index(["doctor_id"], 'fk_dct_doctor_info_dct_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('doctor_id', 'fk_dct_doctor_info_dct_users1_idx')
                ->references('id')->on('md_users')
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
