<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/blocks-x/all.xsl"/>

    {% for block in blocklist %}
    <xsl:template name="call-{{block.name}}" match="block[@id='{{block.name}}']">

        <xsl:call-template name="{{block.name}}">
            <xsl:with-param name="data" select="*"/>
         </xsl:call-template>

    </xsl:template>
    {% endfor %}
</xsl:stylesheet>
