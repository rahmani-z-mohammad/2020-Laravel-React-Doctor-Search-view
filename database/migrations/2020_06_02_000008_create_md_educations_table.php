<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdEducationsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_educations';

    /**
     * Run the migrations.
     * @table md_educations
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('university_name')->nullable();
            $table->string('field_of_study')->nullable();
            $table->string('degree', 45)->nullable();
            $table->smallInteger('start_year')->nullable();
            $table->smallInteger('end_year')->nullable();
            $table->unsignedBigInteger('doctor_id');
            $table->unsignedBigInteger('country_id');

            $table->index(["doctor_id"], 'fk_dct_educations_dct_users1_idx');

            $table->index(["country_id"], 'fk_md_educations_md_countries1_idx');
            $table->nullableTimestamps();


            $table->foreign('doctor_id', 'fk_dct_educations_dct_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('country_id', 'fk_md_educations_md_countries1_idx')
                ->references('id')->on('md_countries')
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
