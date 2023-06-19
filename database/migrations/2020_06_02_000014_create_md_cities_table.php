<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdCitiesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_cities';

    /**
     * Run the migrations.
     * @table md_cities
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('name', 45)->nullable();
            $table->unsignedBigInteger('country_id');

            $table->index(["country_id"], 'fk_md_cities_md_countries1_idx');
            $table->nullableTimestamps();


            $table->foreign('country_id', 'fk_md_cities_md_countries1_idx')
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
