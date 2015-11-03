<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="page/content">
        <div class="content">
        <xsl:value-of select="." disable-output-escaping="yes"/>
        </div>
    </xsl:template>

</xsl:stylesheet>
