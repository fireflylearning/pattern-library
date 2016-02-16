        <head>
            <meta charset="utf-8"/>
            <meta http-equiv="x-ua-compatible" content="ie=edge"/>
            <title>{{page.title}} : {{site.title}}</title>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
            <!-- Place favicon.ico in the root directory -->
            <link rel="stylesheet" href="/vendor/css/jquery-ui-1.10.3.custom.min.css"/>
            <link rel="stylesheet" href="/css/pages.min.css"/>
            <link rel="stylesheet" href="/css/blocks.core.css"/>
            <link id="crate_theme-switch" rel="stylesheet" href="/css/blocks.core.css"/>

            <script src="/vendor/js/jquery-1.11.3.js"></script>
            <script src="/vendor/js/jquery-ui-1.10.3.custom.min.js"></script>

            <script src="/vendor/js/react-with-addons.js"></script>
            <script src="/vendor/js/underscore-min.js"></script>

            <script src="/css/icons/grunticon.loader.js"></script>
            <script>
            // FIXME: For now, load all icons, but should update to only load theme icons
            if (grunticon) {
                grunticon(["/css/icons/icons.core.svg.css", "/css/icons/icons.core.png.css", "/css/icons/icons.core.fallback.css"], grunticon.svgLoadedCallback);
                grunticon(["/css/icons/icons.melody.svg.css", "/css/icons/icons.melody.png.css", "/css/icons/icons.melody.fallback.css"], grunticon.svgLoadedCallback);
            }
            </script>
            <noscript><link href="/css/icons/icons.core.fallback.css" rel="stylesheet"/></noscript>
            <noscript><link href="/css/icons/icons.melody.fallback.css" rel="stylesheet"/></noscript>

        </head>
