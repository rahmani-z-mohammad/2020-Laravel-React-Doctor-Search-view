<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdDiagnosisesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_diagnosises';

    /**
     * Run the migrations.
     * @table md_diagnosises
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->text('disease')->nullable();
            $table->text('medicine')->nullable();
            $table->text('remarks')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('doctor_id');

            $table->index(["doctor_id"], 'fk_md_diagnosises_md_users2_idx');

            $table->index(["user_id"], 'fk_md_diagnosises_md_users1_idx');
            $table->nullableTimestamps();


            $table->foreign('user_id', 'fk_md_diagnosises_md_users1_idx')
                ->references('id')->on('md_users')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('doctor_id', 'fk_md_diagnosises_md_users2_idx')
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
