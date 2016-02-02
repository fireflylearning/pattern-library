<script>
    // Adds class of svg to the html tag if svg is enabled
    (function flagSVG() {
        var ns = {'svg': 'http://www.w3.org/2000/svg'};
        if(document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")) {document.getElementsByTagName('html')[0].className += ' svg';}
    })();

    (function (document, undefined) {
        // Pattern selector
        if (document.getElementById('pattern-submit')) {
            document.getElementById('pattern-submit').style.display = 'none';
            document.getElementById('pattern-select').onchange = function() {
                //document.location=this.options[this.selectedIndex].value;
                var val = this.value;
                if (val !== "") {
                    window.location = val;
                }
            }
        }
    })(document);

    (function(document, window, undefined){
        var cookies;

        function setCookie(name,value,days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else var expires = "";
            document.cookie = name+"="+value+expires+"; path=/";
        }

        function getCookie(name,c,C,i){
            if(cookies){ return cookies[name]; }

            c = document.cookie.split('; ');
            cookies = {};

            for(i=c.length-1; i>=0; i--){
               C = c[i].split('=');
               cookies[C[0]] = C[1];
            }

            return cookies[name];
        }

        window.getCookie = getCookie;
        window.setCookie = setCookie;

    })(document, window);

    (function(window, document, undefined){

        function changeCSS(cssFile, linkId) {

            var oldlink = document.getElementById(linkId);
            var newlink = document.createElement("link");
            newlink.setAttribute("rel", "stylesheet");
            newlink.setAttribute("type", "text/css");
            newlink.setAttribute("href", cssFile);
            newlink.setAttribute("id", linkId);

            document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
        }

        if (document.getElementById('theme-select')) {
            document.getElementById('theme-select').onchange = function() {
                var val = this.value;
                if (!val) return;
                changeCSS(val, 'crate_theme-switch');
                window.setCookie('theme', val);
                console.log(getCookie('theme'));
            }
        }

        var theme = window.getCookie('theme');
        if (theme) {

            changeCSS(theme, 'crate_theme-switch');
            document.getElementById('theme-select').value = theme;
        }

    })(window, document);


</script>
