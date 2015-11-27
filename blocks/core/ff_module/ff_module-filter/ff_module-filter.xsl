<xsl:template name="ff_module-filter">
	<xsl:param name="data" />
	<div class="ff_module-filter">
		<div class="ff_module-filter__heading" data-control="filter-dropdown">
			<label class="ff_module-filter__label"><xsl:value-of select="label"/></label>
			<button class="ff_module-filter__control"><span data-icon="filter-dropdown-icon" class="ff_icon ff_icon-arrow"></span></button>
		</div>
		<div class="ff_module-filter__content" data-content="filter-content">
			<xsl:value-of select="content" />
		</div>
	</div>
</xsl:template>
