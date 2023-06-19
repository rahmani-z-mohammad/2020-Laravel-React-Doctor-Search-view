<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdCommentsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_comments';

    /**
     * Run the migrations.
     * @table md_comments
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->text('comment')->nullable();
            $table->string('date_time', 45)->nullable();
            $table->unsignedBigInteger('doctor_id');
            $table->unsignedBigInteger('user_id');

            $table->index(["user_id"], 'fk_md_comments_md_users2_idx');

            $table->index(["doctor_id"], 'fk_md_comments_md_users1_idx');


            $table->foreign('doctor_id', 'fk_md_comments_md_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('user_id', 'fk_md_comments_md_users2_idx')
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
