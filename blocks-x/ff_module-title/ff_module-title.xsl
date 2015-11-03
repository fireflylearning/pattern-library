<xsl:template name="ff_module-title">
    <xsl:param name="data" />
    <div class="ff_module-title">
        <h2><xsl:value-of select="$data/title" /></h2>
        <h3><xsl:value-of select="$data/subtitle" /></h3>
    </div>
</xsl:template>
