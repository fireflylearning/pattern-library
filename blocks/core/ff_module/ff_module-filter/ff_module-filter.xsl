<xsl:template name="ff_module-filter">
	<xsl:param name="data" />
	<div class="ff_module-filter" data-ff="filter">
		<div class="ff_module-filter__heading" data-ff-action="filter-control">
			<label class="ff_module-filter__label"><xsl:value-of select="label"/></label>
			<button class="ff_module-filter__control">
                <span class="ff_icon ff_icon-page-down-open" data-ff-icon-open="ff_icon-page-down-open" data-ff-icon-closed="ff_icon-page-back-open"></span>
            </button>
		</div>
		<div class="ff_module-filter__content" data-ff="filter-content">
			<xsl:value-of select="content" />
		</div>
	</div>
</xsl:template>
