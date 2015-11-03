<?xml version="1.0" ?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ff_module="http://www.fireflylearning/module">

    <xsl:import href="partials/page_title.xsl"/>
    <xsl:import href="partials/page_content.xsl"/>

    <xsl:template match="/">

        <html class="no-js" lang="">
            <head>
            <meta charset="utf-8"/>
            <meta http-equiv="x-ua-compatible" content="ie=edge"/>
            <title><xsl:value-of select="page/title"/></title>
            <meta name="description" content=""/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
            <!-- Place favicon.ico in the root directory -->
            <link rel="stylesheet" href="/css/crate.min.css"/>
            <link rel="stylesheet" href="/css/blocks.min.css"/>

        </head>
        <body>

            <xsl:apply-templates/>

            <a href="/index.xml">Back</a>
            <script src="/vendor/js/jquery-1.11.3.js"></script>
            <script src="/js/blocks.js"></script>
        </body>
        </html>
    </xsl:template>


</xsl:stylesheet>
