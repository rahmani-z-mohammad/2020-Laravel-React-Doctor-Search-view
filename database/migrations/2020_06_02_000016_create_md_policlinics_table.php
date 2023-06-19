<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdPoliclinicsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_policlinics';

    /**
     * Run the migrations.
     * @table md_policlinics
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->integer('fees')->nullable();
            $table->string('assistant_phone_number', 45)->nullable();
            $table->string('pharmacy_phone_number', 45)->nullable();
            $table->text('pharmacy_address')->nullable();
            $table->string('latitude', 45)->nullable();
            $table->string('longitude', 45)->nullable();
            $table->unsignedBigInteger('doctor_id');
            $table->unsignedBigInteger('clinic_id');

            $table->index(["clinic_id"], 'fk_md_policlinics_md_users2_idx');

            $table->index(["doctor_id"], 'fk_md_policlinics_md_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('doctor_id', 'fk_md_policlinics_md_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('clinic_id', 'fk_md_policlinics_md_users2_idx')
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
