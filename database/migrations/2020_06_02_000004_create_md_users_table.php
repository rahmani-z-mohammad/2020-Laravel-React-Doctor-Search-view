<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdUsersTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_users';

    /**
     * Run the migrations.
     * @table md_users
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('id');
            $table->string('fullname')->nullable();
            $table->string('username');
            $table->string('password', 250);
            $table->string('phone_number', 45)->nullable();
            $table->string('email')->nullable();
            $table->string('document_no', 45)->nullable();
            $table->string('document', 45)->nullable();
            $table->string('profile_photo', 45)->nullable();
            $table->string('cover_photo', 45)->nullable();
            $table->enum('type', ['Doctor', 'User', 'Clinic'])->nullable();
            $table->string('language', 7)->nullable();
            $table->nullableTimestamps();
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
