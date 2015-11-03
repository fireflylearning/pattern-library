<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:ff_module="http://www.fireflylearning/module"><xsl:template name="ff_module-button">
    <xsl:param name="data" />
    <div class="ff_module-button">
        <button><xsl:value-of select="$data/text" /></button>
    </div>
</xsl:template>

<xsl:template name="ff_module-title">
    <xsl:param name="data" />
    <div class="ff_module-title">
        <h2><xsl:value-of select="$data/title" /></h2>
        <h3><xsl:value-of select="$data/subtitle" /></h3>
    </div>
</xsl:template>
</xsl:stylesheet>