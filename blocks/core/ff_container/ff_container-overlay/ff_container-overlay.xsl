<xsl:template name="ff_container-overlay">
	<xsl:param name="data" />
	<xsl:variable name="modifier"><xsl:value-of select="$data/overlay/@modifier"/></xsl:variable>

	<xsl:variable name="className">
			<xsl:choose>
					<xsl:when test="$modifier">ff_container-overlay ff_container-overlay--<xsl:value-of select="$modifier"/></xsl:when>
					<xsl:otherwise>ff_container-overlay</xsl:otherwise>
			</xsl:choose>
	</xsl:variable>

	<div class="{$className}">

			<div class="ff_container-overlay__body">
				<xsl:for-each select="$data//body/item">
					<xsl:copy-of select="./node()"/>
				</xsl:for-each>
			</div>

			<div class="ff_container-overlay__bar">
				<div class="ff_container-overlay__bar-content">
					<xsl:for-each select="$data//bar/item">
						<xsl:copy-of select="./node()"/>
					</xsl:for-each>
				</div>
			</div>
	</div>

</xsl:template>
