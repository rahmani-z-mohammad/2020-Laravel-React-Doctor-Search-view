<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdRatingsTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_ratings';

    /**
     * Run the migrations.
     * @table md_ratings
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
			$table->bigIncrements('id');
            $table->unsignedBigInteger('question_id');
            $table->unsignedBigInteger('doctor_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('rating')->nullable();
            $table->string('date_time', 45)->nullable();

            $table->index(["doctor_id"], 'fk_md_rating_questions_has_md_users_md_users1_idx');

            $table->index(["user_id"], 'fk_md_rating_questions_has_users_md_users1_idx');

            $table->index(["question_id"], 'fk_md_rating_questions_has_md_users_md_rating_questions1_idx');


            $table->foreign('question_id', 'fk_md_rating_questions_has_md_users_md_rating_questions1_idx')
                ->references('id')->on('md_rating_questions')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('doctor_id', 'fk_md_rating_questions_has_md_users_md_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('user_id', 'fk_md_rating_questions_has_users_md_users1_idx')
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
