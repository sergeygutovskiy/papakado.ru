<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeliveryCouriersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('delivery_couriers', function (Blueprint $table) {
            $table->id();

            $table->string('street');
            $table->string('house');
            $table->string('room')->nullable();
            $table->string('floor')->nullable();
            $table->string('entrance')->nullable();
            $table->string('intercom')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('delivery_couriers');
    }
}
