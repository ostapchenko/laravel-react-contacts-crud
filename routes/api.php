<?php

use App\Http\Controllers\ContactController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::get('user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('contacts', ContactController::class);
});
