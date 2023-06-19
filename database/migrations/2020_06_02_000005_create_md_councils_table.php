<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdCouncilsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_councils';

    /**
     * Run the migrations.
     * @table md_councils
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
            $table->integer('number_of_council')->nullable();
            $table->unsignedBigInteger('doctor_id');

            $table->index(["doctor_id"], 'fk_md_councils_md_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('doctor_id', 'fk_md_councils_md_users1_idx')
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
