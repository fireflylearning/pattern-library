<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/blocks/all.xsl"/>

    {% for block in blocklist %}
    <xsl:template name="call-{{block.basename}}">
        <xsl:for-each select="block[@id='{{block.basename}}']">
            <xsl:call-template name="{{block.basename}}">
                <xsl:with-param name="data" select="."/>
            </xsl:call-template>
        </xsl:for-each>
    </xsl:template>
    {% endfor %}
</xsl:stylesheet>
