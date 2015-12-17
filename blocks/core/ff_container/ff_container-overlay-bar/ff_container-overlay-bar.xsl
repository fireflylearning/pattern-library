<xsl:template name="ff_container-overlay-bar">
	<xsl:param name="data" />
    <xsl:variable name="modifier"><xsl:value-of select="$data/overlay-bar/@modifier"/></xsl:variable>

    <xsl:variable name="className">
        <xsl:choose>
            <xsl:when test="$modifier">ff_container-overlay-bar ff_container-overlay-bar--<xsl:value-of select="$modifier"/></xsl:when>
            <xsl:otherwise>ff_container-overlay-bar</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="{$className}">
        <div class="ff_container-overlay-bar__content">
        <xsl:call-template name="ff_container-control-bar">
            <xsl:with-param name="data" select="$data" />
        </xsl:call-template>
        </div>
    </div>

</xsl:template>
