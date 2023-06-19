<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdDoctorSpecializationsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_doctor_specializations';

    /**
     * Run the migrations.
     * @table md_doctor_specializations
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('doctor_id');
            $table->unsignedBigInteger('specialization_id');
            $table->text('remarks')->nullable();

            $table->index(["doctor_id"], 'fk_dct_users_has_specializations_dct_users1_idx');

            $table->index(["specialization_id"], 'fk_dct_users_has_specializations_specializations1_idx');


            $table->foreign('doctor_id', 'fk_dct_users_has_specializations_dct_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('specialization_id', 'fk_dct_users_has_specializations_specializations1_idx')
                ->references('id')->on('md_specializations')
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
