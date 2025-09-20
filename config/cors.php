<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => [
        'api/*',
        'login',
        'logout',
        'register',
        'sanctum/csrf-cookie',
    ],

    'allowed_methods' => ['*'],

    // This is the most critical setting for your virtual host setup.
    // It tells your backend that your frontend at this URL is trusted.
    'allowed_origins' => ['http://job-board.test'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // This MUST be true for Sanctum's session-based SPA authentication to work.
    'supports_credentials' => true,

];