<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt"
    xmlns:ext="http://exslt.org/common">

    <xsl:output method="html" omit-xml-declaration="yes" indent="yes"
     encoding="utf-8"/>

    {% include '../includes/base-file.xsl' with { blocks:page.blocks } %}
    {% include '../includes/call-template.xsl' with { blocks:page.blocks } %}

    {% if requires %}
    {% include '../includes/require-template.xsl' with {blocks:requires} %}
    {% endif %}

    <xsl:template match="blocks">
        <xsl:call-template name="call-{{info.basename}}"/>
    </xsl:template>

    <xsl:template match="/">
        <xsl:text disable-output-escaping='yes'>&lt;!DOCTYPE html&gt;</xsl:text>
        <html class="no-js" lang="">
            <head>
            <meta charset="utf-8"/>
            <meta http-equiv="x-ua-compatible" content="ie=edge"/>
            <title>{{page.title}} ::: {{site.title}}</title>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
            <!-- Place favicon.ico in the root directory -->
            <link rel="stylesheet" href="/css/crate.min.css"/>
            <link rel="stylesheet" href="/css/blocks.core.css"/>

        </head>
        <body>
            {% include '../includes/crate-theme-select.xsl' with { themes: site.themes} %}

            <div class="crate_block">
                <xsl:apply-templates select="blocks"/>
            </div>
            <div class="content">{{contents|safe}}</div>

            <div class="crate_link">
                <a href="/">&lt; Back</a>
            </div>

            <script src="/vendor/js/jquery-1.11.3.js"></script>
            <script src="/js/blocks.js"></script>
            {% include '../includes/inline-scripts.xsl' %}
        </body>
        </html>
    </xsl:template>

</xsl:stylesheet>
