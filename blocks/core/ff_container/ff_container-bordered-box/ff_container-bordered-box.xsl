<xsl:template name="ff_container-bordered-box">
	<xsl:param name="data" />
    
    <div class="ff_container-bordered-box">
        <xsl:copy-of select="$data/content/node()"/>
    </div>

</xsl:template>