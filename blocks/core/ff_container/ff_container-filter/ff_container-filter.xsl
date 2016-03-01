<xsl:template name="ff_container-filter">
	<xsl:param name="data" />
	<div class="ff_container-filter">
		<div class="ff_container-filter__content">
			<div class="ff_container-filter__heading">
				<label class="ff_container-filter__label"><xsl:value-of select="$data/filter/label"/></label>
			</div>
			<div class="ff_container-filter__items">
				<xsl:for-each select="$data//filter/set">
					<xsl:apply-templates select="." mode="ff_container-filter"/>
				</xsl:for-each>
			</div>
		</div>
	</div>
</xsl:template>

<xsl:template match="set" mode="ff_container-filter">
	<xsl:for-each select="module">
		<xsl:copy-of select="./node()"/>
	</xsl:for-each>
</xsl:template>