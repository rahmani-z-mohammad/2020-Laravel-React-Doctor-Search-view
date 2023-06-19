<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdLeavesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_leaves';

    /**
     * Run the migrations.
     * @table md_leaves
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('from_date', 45)->nullable();
            $table->string('to_date', 45)->nullable();
            $table->unsignedBigInteger('doctor_id');

            $table->index(["doctor_id"], 'fk_md_leaves_md_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('doctor_id', 'fk_md_leaves_md_users1_idx')
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
