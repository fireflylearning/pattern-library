<xsl:template name="ff_module-task-listing-empty-state">
	<xsl:param name="data" />
	<div class="ff_module-task-listing-empty-state">
		<p class="ff_module-task-listing-empty-state__text"><xsl:value-of select="$data/empty_state/text"/></p>
		<div class="ff_module-task-listing-empty-state__action">
			<xsl:call-template name="ff_module-button">
				<xsl:with-param name="data" select="$data/empty_state" />
			</xsl:call-template>
		</div>
	</div>
</xsl:template>