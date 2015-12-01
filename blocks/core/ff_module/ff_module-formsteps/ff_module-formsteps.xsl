<xsl:template name="ff_module-formsteps">
<xsl:param name="data" />
<ul class="ff_module-formsteps">
<xsl:for-each select="$data/items/item">
	<xsl:variable name="state">
		<xsl:choose>
			<xsl:when test="@state = 'current'">
				<xsl:text>ff_module-formstep--current</xsl:text>
			</xsl:when>
			<xsl:when test="@state = 'completed' ">
				<xsl:text>ff_module-formstep--completed</xsl:text>
			</xsl:when>
            <xsl:otherwise>
                <xsl:text>ff_module-formstep--default</xsl:text>
            </xsl:otherwise>
		</xsl:choose>
	</xsl:variable>
	<li class="ff_module-formstep {$state}">
		<a class="ff_module-formstep__link" href="{@url}">
			<span class="ff_module-formstep__icon">
				<span class="ff_module-formstep__stepnumber"><xsl:number/></span>
			</span>
			<p class="ff_module-formstep__text"><xsl:value-of select="." /></p>
		</a>
	</li>
</xsl:for-each>
</ul>
</xsl:template>
