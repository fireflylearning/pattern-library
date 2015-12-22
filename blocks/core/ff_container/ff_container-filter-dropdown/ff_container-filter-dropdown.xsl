<xsl:template name="ff_container-filter-dropdown">
	<xsl:param name="data" />
	<div class="ff_container-filter-dropdown" data-ff="filter">
		<div class="ff_container-filter-dropdown__heading" data-ff-action="filter-control">
			<label class="ff_container-filter-dropdown__label">Sort by</label>
			<button class="ff_container-filter-dropdown__control">
                <span class="ff_icon ff_icon-caret-down" data-ff-icon-open="ff_icon-caret-down" data-ff-icon-closed="ff_icon-caret-right"></span>
            </button>
		</div>
		<div class="ff_container-filter-dropdown__content" data-ff="filter-content">
			<span class="crate_util-block">Content</span>
		</div>
	</div>
</xsl:template>
