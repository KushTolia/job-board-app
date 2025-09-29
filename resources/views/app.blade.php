<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Job Board</title>

    {{-- This is the most important line. It loads your compiled CSS and JS. --}}
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>

<body>
    {{-- This is the div where your entire React application will be mounted. --}}
    <div id="root"></div>
</body>

</html>
