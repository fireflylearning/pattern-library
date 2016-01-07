<xsl:template name="ff_module-class">
	<xsl:param name="data" />
	
	<dl class="ff_module-class">
		<dt class="ff_module-class__item ff_module-class__item--name">
			<xsl:value-of select="$data/class/@name">
		</dt>
		<dd class="ff_module-class__item ff_module-class__item--from">
			<xsl:value-of select="$data/class/@from">
		</dd>
		<dd class="ff_module-class__item ff_module-class__item--date">
			<xsl:value-of select="$data/next-lesson/@date-time">
		</dd>
		<dd class="ff_module-class__item ff_module-class__item--location">
			<xsl:value-of select="$data/next-lesson/@location">
		</dd>
	</dl>
	
	
	
</xsl:template>