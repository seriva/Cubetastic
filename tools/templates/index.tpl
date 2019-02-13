<!DOCTYPE html>
<html>
    <head>
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
        <link rel="manifest" href="manifest.json">

        <meta charset="utf-8"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"/>
        <meta name="theme-color" content="#000000">

        <style>
            html {
                height: 100%;
            }       
            body {
                background: #000;
                min-geight: 100%;
                margin: 0;
                padding: 0;
                position: relative;
                overflow: hidden;
                color: white;
                font-family: Consolas, monaco, monospace; font-weight: bold
            }
        </style>        

        <title>QDFPA</title>
    </head>
    <body>
        <script type="text/javascript" src="app.js"></script>
        <script>
            window.env = '{{environment}}';
            window.onerror = function(msg, url, line, column, error) {
                document.body.style.padding = '5px';
                document.body.style.overflow = 'scroll';
                document.body.innerHTML = "Error (" + line  + "," + column + "): " + msg + "<br />Stack: " + error.stack;
                return false;
            };     
            require('main');
        </script>
    </body>
</html>
