        <head>
            <meta charset="utf-8"/>
            <meta http-equiv="x-ua-compatible" content="ie=edge"/>
            <title>{{page.title | default(page.blocks[0].name)}} : {{site.title}}</title>
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
            <script src="/vendor/js/react-dom.js"></script>

            <script src="/vendor/js/redux.min.js"></script>
            <script src="/vendor/js/react-redux.min.js"></script>

            <script src="/vendor/js/underscore-min.js"></script>

            <script src="/css/icons/grunticon.loader.js"></script>
            <script>
            (function(document, window, undefined){
                function setIconTheme(theme) {
                    if (typeof grunticon !== "undefined") {
                        var base = "/css/icons/icons."+theme;
                        grunticon([base+".svg.css", base+".png.css", base+".fallback.css"], grunticon.svgLoadedCallback);
                    } else {
                        console.warn('Grunticon loader script not found; please check paths and build settings');
                    }
                }
                window.setIconTheme = setIconTheme;

            })(document, window);
            </script>
            <noscript><link href="/css/icons/icons.core.fallback.css" rel="stylesheet"/></noscript>
            <noscript><link href="/css/icons/icons.melody.fallback.css" rel="stylesheet"/></noscript>

        </head>
