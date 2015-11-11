<xsl:template name="ff_module-button">
    <xsl:param name="data" />
    <h1>whutc</h1>
    <div class="ff_module-button {$data/classes}">
        <button><xsl:value-of select="$data/text" /></button>
    </div>
</xsl:template>
