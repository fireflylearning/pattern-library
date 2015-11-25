<xsl:template name="ff_module-filter">
	<xsl:param name="data" />
	<div class="ff_module-filter">
		<div class="ff_module-filter__label">
			<span><xsl:value-of select="label"/></span>
			<span class="ff_icon ff_icon-arrow pull-right"></span>
		</div>
		<div class="ff_module-filter__content">
			<xsl:value-of select="content" />
		</div>
	</div>
</xsl:template>
