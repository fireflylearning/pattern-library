<xsl:template name="ff_module-button--wide">
    <xsl:param name="data" />
    <div class="ff_module-button ff_module-button--wide {$data/classes}">
        <button><xsl:value-of select="$data/text" /></button>
    </div>
</xsl:template>