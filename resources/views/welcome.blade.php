<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Larvue</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=lato:300,400,700,900" rel="stylesheet" />

        @vite(['resources/js/app.js'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
