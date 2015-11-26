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

    (function(document, undefined){

        function setCookie(key, val) {
            document.cookie = key + "=" +val;
        }
        function getCookie(name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length == 2) return parts.pop().split(";").shift();
        }

        function changeCSS(cssFile, linkId) {

            var oldlink = document.getElementById(linkId);
            console.log(oldlink);
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
                setCookie('theme', val);
                console.log(getCookie('theme'));
            }
        }

        var theme = getCookie('theme');
        if (theme) {
            changeCSS(theme, 'crate_theme-switch');
            document.getElementById('theme-select').value = theme;
        }

    })(document);


</script>
