<xsl:template name="ff_module-empty-state">
	<xsl:param name="data" />
	<xsl:variable name="emptyState" select="$data//emptyState"/>
	<div class="ff_module-empty-state">
		<xsl:if test="$emptyState/image">
			<div class="ff_module-empty-state__item ff_module-empty-state__item--decoration">
				<xsl:copy-of select="$emptyState/image/node()"/> 
			</div>
		</xsl:if>
		<xsl:if test="$emptyState/headline">
			<div class="ff_module-empty-state__item ff_module-empty-state__item--headline">
				<xsl:value-of select="$emptyState/headline" />
			</div>
		</xsl:if>
		<xsl:if test="$emptyState/explanation">
			<div class="ff_module-empty-state__item ff_module-empty-state__item--explanation">
				<xsl:value-of select="$emptyState/explanation" />
			</div>
		</xsl:if>
		<xsl:if test="$emptyState/callToAction">
			<div class="ff_module-empty-state__item ff_module-empty-state__item--calltoaction">
				<xsl:copy-of select="$emptyState/callToAction/node()"/> 
			</div>
		</xsl:if>
	</div>

	
</xsl:template>