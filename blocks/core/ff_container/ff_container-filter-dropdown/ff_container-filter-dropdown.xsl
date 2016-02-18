<xsl:template name="ff_container-filter-dropdown">
	<xsl:param name="data" />
	<div class="ff_container-filter-dropdown" data-ff="filter">
		<div class="ff_container-filter-dropdown__toggler" data-ff-action="filter-toggler"><span data-icon="filter-toggler-icon" class="ff_icon ff_icon-left ff_icon-page-down-blue"></span><span data-ff="filter-toggler-text">Hide filters</span></div>
		<div class="ff_container-filter-dropdown__filter" data-ff="filter-content">
			<div class="ff_container-filter-dropdown__heading">
				<label class="ff_container-filter-dropdown__label"><xsl:value-of select="$data/filter-dropdown/label"/></label>
			</div>
			<div class="ff_container-filter-dropdown__content">
				<xsl:for-each select="$data//filter-dropdown/set">
					<xsl:apply-templates select="." mode="ff_container-filter-dropdown"/>
				</xsl:for-each>
			</div>
		</div>
	</div>
</xsl:template>

<xsl:template match="set" mode="ff_container-filter-dropdown">
	<xsl:for-each select="module">
		<xsl:copy-of select="./node()"/>
	</xsl:for-each>
</xsl:template>