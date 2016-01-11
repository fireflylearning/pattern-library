<xsl:template name="ff_container-bordered-box">
	<xsl:param name="data" />

    <xsl:variable name="modifier"><xsl:value-of select="$data/box/@modifier"/></xsl:variable>

    <xsl:variable name="className">
        <xsl:choose>
            <xsl:when test="$modifier">ff_container-bordered-box ff_container-bordered-box--<xsl:value-of select="$modifier"/></xsl:when>
            <xsl:otherwise>ff_container-bordered-box</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    
    <div class="{$className}">
        <xsl:copy-of select="$data/content/node()"/>
    </div>

</xsl:template>