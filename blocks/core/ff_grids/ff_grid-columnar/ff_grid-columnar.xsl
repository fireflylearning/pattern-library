<xsl:template name="ff_grid-columnar">
    <xsl:param name="data" />
    <div class="ff_grid-columnar">
		<xsl:attribute name="class">
	        <xsl:text>ff_grid-columnar</xsl:text>
	       	<xsl:if test="$data/grid/@modifier"> ff_grid-columnar--<xsl:value-of select="$data/grid/@modifier"/></xsl:if>
	       	<xsl:if test="$data/grid/@classes"><xsl:value-of select="concat(' ', $data/grid/@classes)"/></xsl:if>
	    </xsl:attribute>
        <div class="ff_grid-columnar__column">
        	<xsl:for-each select="$data/grid/item">
				<xsl:copy-of select="./node()"/>
			</xsl:for-each>
        </div>
    </div>
</xsl:template>