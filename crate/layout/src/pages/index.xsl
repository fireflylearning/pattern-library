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
        <head>
            <meta charset="utf-8"/>
            <meta http-equiv="x-ua-compatible" content="ie=edge"/>
            <title>{{page.title}} : {{site.title}}</title>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
            <!-- Place favicon.ico in the root directory -->
            <link rel="stylesheet" href="/css/crate.min.css"/>
            <link rel="stylesheet" href="/css/blocks.core.css"/>

        </head>
        <body>

            {% include '../includes/crate-theme-select.xsl' with { themes: site.themes} %}

            <h1>{{page.title}} : {{site.title}}</h1>

            <div class="contents">{{contents|safe}}</div>

            <h3>Blocks</h3>
            <xsl:apply-templates select="page/blocks"/>


            <h3>Pages</h3>
            {% include '../includes/page-listing.xsl' %}

            {% include '../includes/dropdown-files.xsl' %}

            <script src="/vendor/js/jquery-1.11.3.js"></script>
            <script src="/js/blocks.js"></script>
            {% include '../includes/inline-scripts.xsl' %}
        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
