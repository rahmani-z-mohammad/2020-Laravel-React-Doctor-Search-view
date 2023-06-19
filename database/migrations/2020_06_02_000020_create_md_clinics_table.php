<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdClinicsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_clinics';

    /**
     * Run the migrations.
     * @table md_clinics
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('latitude', 45)->nullable();
            $table->string('longitude', 45)->nullable();
            $table->string('village', 45)->nullable();
            $table->unsignedBigInteger('clinic_id');
            $table->unsignedBigInteger('district_id');
            $table->string('manager', 45)->nullable();
            $table->string('manager_phone', 45)->nullable();
            $table->string('receptionist', 45)->nullable();
            $table->string('receptionist_phone', 45)->nullable();
            $table->string('facebook')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('twitter')->nullable();
            $table->integer('num_views')->nullable();

            $table->index(["district_id"], 'fk_md_clinic_infos_md_districts1_idx');

            $table->index(["clinic_id"], 'fk_md_clinic_infos_md_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('clinic_id', 'fk_md_clinic_infos_md_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('district_id', 'fk_md_clinic_infos_md_districts1_idx')
                ->references('id')->on('md_districts')
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
