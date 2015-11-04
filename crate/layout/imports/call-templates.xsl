<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/blocks/all.xsl"/>


    <xsl:template name="call-ff_module-button">
        <xsl:for-each select="block[@id='ff_module-button']">
            <xsl:call-template name="ff_module-button">
                <xsl:with-param name="data" select="."/>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="call-ff_module-title">
        <xsl:for-each select="block[@id='ff_module-title']">
            <xsl:call-template name="ff_module-title">
                <xsl:with-param name="data" select="."/>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>

    <xsl:template name="call-ff_module-button--wide">
        <xsl:for-each select="block[@id='ff_module-button--wide']">
            <xsl:call-template name="ff_module-button--wide">
                <xsl:with-param name="data" select="."/>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>

</xsl:stylesheet>
