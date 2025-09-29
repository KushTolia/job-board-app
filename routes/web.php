<?php

use Illuminate\Support\Facades\Route;

// This is the "catch-all" route. It tells Laravel that for any web request
// that is NOT an API request, it should just return the main 'app' view.
// Your React Router will then read the URL and display the correct page.
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');