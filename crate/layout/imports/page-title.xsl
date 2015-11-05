<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="page-title">
        <xsl:param name="text"/>
        <h1><xsl:value-of select="$text"/></h1>
        <hr/>
    </xsl:template>
</xsl:stylesheet>
