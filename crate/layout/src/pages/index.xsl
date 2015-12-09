<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:ext="http://exslt.org/common">

    <xsl:output method="html" omit-xml-declaration="yes" indent="yes"
     encoding="utf-8"/>

    {% include '../includes/base-file.xsl' with { blocks: site.blocks } %}
    {% include '../includes/call-template.xsl' with { blocks: site.blocks } %}
    {% include '../includes/block-listing.xsl' with { blocks: site.blocks } %}

    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
        <html class="no-js" lang="">

        {% include '../includes/head.xsl' %}
        <body>

            {% include '../includes/crate-theme-select.xsl' with { themes: site.themes} %}
            <div class="crate-wrapper">
                <div class="crate-main">
                <h1>{{page.title}} : {{site.title}}</h1>

                <div class="contents">{{contents|safe}}</div>

                <xsl:apply-templates select="page/blocks"/>
                </div>



                <div class="crate-nav">
                <h3>Blocks</h3>
                {% include '../includes/block-nav-listing.xsl' %}
                <h3>Pages</h3>
                {% include '../includes/page-listing.xsl' %}
                </div>
            </div>

            {% include '../includes/dropdown-files.xsl' %}

            {% include '../includes/foot.xsl' %}

        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
