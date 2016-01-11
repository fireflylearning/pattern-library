<xsl:template name="ff_module-class">
	<xsl:param name="data" />
	
	<dl class="ff_module-class">
		<dt class="ff_module-class__item ff_module-class__item--name">
			<a class="ff_module-class__link" href="/classes/{$data/class/@guid}"><xsl:value-of select="$data/class/@name" /></a>
		</dt>
		<dd class="ff_module-class__item ff_module-class__item--teacher">
			<xsl:value-of select="$data/class/@teacher" />
		</dd>
		<dd class="ff_module-class__item ff_module-class__item--date">
			<xsl:value-of select="$data/class/next-lesson/@display-date-time" />
		</dd>
		<dd class="ff_module-class__item ff_module-class__item--location">
			<xsl:value-of select="$data/class/next-lesson/@location" />
		</dd>
	</dl>
	
</xsl:template>