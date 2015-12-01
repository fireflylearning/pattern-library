<xsl:template name="ff_module-formstep">
<xsl:param name="data" />
<xsl:for-each select="$data/items/item">
	<xsl:variable name="state">
		<xsl:choose>
			<xsl:when test="contains(@state, 'current') ">
				<xsl:text> ff_module-step--current</xsl:text>
			</xsl:when>
			<xsl:when test="@state = 'completed' ">
				<xsl:text> ff_module-step--completed</xsl:text>
			</xsl:when>
		</xsl:choose>
	</xsl:variable>
	<li class="ff_module-formstep {$state}">
		<a class="ff_module-formstep__link" href="{@url}">
			<span class="ff_icon ff_module-formstep__icon">
				<span class="ff_module-formstep__stepnumber"><xsl:number/></span>
			</span>
			<p class="ff_module-formstep__text"><xsl:value-of select="." /></p>
		</a>
	</li>
</xsl:for-each>

</xsl:template>
