<xsl:template name="ff_module-text-with-label">
	<xsl:param name="data" />
	
	<div>
		<xsl:attribute name="class">
			<xsl:choose>
				<xsl:when test="textWithLabel/@modifier">ff_module-text-with-label ff_module-text-with-label--<xsl:value-of select="textWithLabel/@modifier"/></xsl:when>
				<xsl:otherwise>ff_module-text-with-label</xsl:otherwise>
			</xsl:choose>
		</xsl:attribute>
		<div class="ff_module-text-with-label__label">
			<xsl:value-of select="textWithLabel/label"/>
		</div>
		<div class="ff_module-text-with-label__text">
			<xsl:value-of select="textWithLabel/text"/>
		</div>
	</div>
</xsl:template>