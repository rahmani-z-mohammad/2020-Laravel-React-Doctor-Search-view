<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMdClinicServicesTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'md_clinic_services';

    /**
     * Run the migrations.
     * @table md_clinic_services
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('clinic_id');
            $table->text('remarks')->nullable();

            $table->index(["clinic_id"], 'fk_md_services_has_md_users_md_users1_idx');

            $table->index(["service_id"], 'fk_md_services_has_md_users_md_services1_idx');


            $table->foreign('service_id', 'fk_md_services_has_md_users_md_services1_idx')
                ->references('id')->on('md_services')
                ->onDelete('no action')
                ->onUpdate('no action');

            $table->foreign('clinic_id', 'fk_md_services_has_md_users_md_users1_idx')
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
