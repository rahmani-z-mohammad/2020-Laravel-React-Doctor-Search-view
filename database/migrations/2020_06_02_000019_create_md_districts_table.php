<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdDistrictsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_districts';

    /**
     * Run the migrations.
     * @table md_districts
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('name', 45)->nullable();
            $table->unsignedBigInteger('cities_id');

            $table->index(["cities_id"], 'fk_md_districts_md_cities1_idx');
            $table->nullableTimestamps();


            $table->foreign('cities_id', 'fk_md_districts_md_cities1_idx')
                ->references('id')->on('md_cities')
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
