<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="blocks/title">
        <div class="ff_module-title">
            <h2><xsl:value-of select="."/></h2>
        </div>
    </xsl:template>
</xsl:stylesheet>
