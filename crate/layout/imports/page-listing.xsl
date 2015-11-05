<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="page-listing">
        <ul class="crate_pagelist">
            {% for page in filelist %}
                <li class="crate_pagelist__item"><a href="{{page.link}}">{{page.title| default(page.basename)}}</a></li>
            {% endfor %}
        </ul>
    </xsl:template>


</xsl:stylesheet>

