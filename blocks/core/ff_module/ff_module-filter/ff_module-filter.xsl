<xsl:template name="ff_module-filter">
	<xsl:param name="data" />
	<div class="ff_module-filter" data-ff="filter">
		<div class="ff_module-filter__heading" data-ff-action="filter-control">
			<label class="ff_module-filter__label"><xsl:value-of select="label"/></label>
			<button class="ff_module-filter__control"><span data-ff-icon="filter-dropdown-icon" class="ff_icon ff_icon-arrow"></span></button>
		</div>
		<div class="ff_module-filter__content" data-ff="filter-content">
			<xsl:value-of select="content" />
		</div>
	</div>
</xsl:template>
