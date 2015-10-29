<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="module/button">
        <div class="ff_module-button">
            <button><xsl:value-of select="."/></button>
        </div>
    </xsl:template>
</xsl:stylesheet>
