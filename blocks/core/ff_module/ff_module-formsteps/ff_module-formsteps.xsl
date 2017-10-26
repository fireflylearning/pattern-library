<xsl:template name="ff_module-formsteps">
<xsl:param name="data" />

<ul class="ff_module-formsteps">
<xsl:for-each select="$data/formsteps/step">

	<xsl:variable name="classes">
		<xsl:choose>
			<xsl:when test="not(@state = '')">ff_module-formstep ff_module-formstep--<xsl:value-of select="@state"/>
			</xsl:when>
            <xsl:otherwise>
                <xsl:text>ff_module-formstep</xsl:text>
            </xsl:otherwise>
		</xsl:choose>
	</xsl:variable>

	<li class="{$classes}">
        <xsl:if test="label/@tab-attr-name">
            <xsl:attribute name="{label/@tab-attr-name}">
                <xsl:value-of select="@id"/>
            </xsl:attribute>
        </xsl:if>

		<xsl:attribute name="data-label">
            <xsl:value-of select="@id" />
		</xsl:attribute>

		<a class="ff_module-formstep__link" href="{@url}">
			<span class="ff_module-formstep__icon">
				<span class="ff_module-formstep__stepnumber"><xsl:number/></span>
			</span>
			<p class="ff_module-formstep__text"><xsl:value-of select="label" /></p>
		</a>
        <xsl:if test="position() != last()">
            <span class="ff_module-formstep__separator">
                <span class="ff_icon ff_module-formstep__separatorIcon"/>
            </span>
        </xsl:if>
	</li>
</xsl:for-each>
</ul>
</xsl:template>
