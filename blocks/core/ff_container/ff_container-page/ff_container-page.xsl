<xsl:template name="ff_container-page">
	<xsl:param name="data" />
    
    <div class="ff_container-page">
        <xsl:copy-of select="$data/content/*"/>
    </div>

</xsl:template>