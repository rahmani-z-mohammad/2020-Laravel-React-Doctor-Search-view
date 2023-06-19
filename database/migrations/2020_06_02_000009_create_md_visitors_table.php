<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdVisitorsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_visitors';

    /**
     * Run the migrations.
     * @table md_visitors
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('age', 45)->nullable();
            $table->string('gender', 6)->nullable();
            $table->unsignedBigInteger('user_id');

            $table->index(["user_id"], 'fk_user_info_md_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('user_id', 'fk_user_info_md_users1_idx')
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
