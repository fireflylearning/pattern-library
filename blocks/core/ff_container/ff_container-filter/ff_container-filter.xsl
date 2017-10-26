<xsl:template name="ff_container-filter">
	<xsl:param name="data" />
	<div class="ff_container-filter">
		<xsl:if test="$data/filter/button">
			<div class="ff_container-filter__clear-button">
				<xsl:call-template name="ff_module-button">
					<xsl:with-param name="data" select="$data/filter" />
				</xsl:call-template>
			</div>
		</xsl:if>
		<div class="ff_container-filter__content">
			<div class="ff_container-filter__heading">
				<label class="ff_container-filter__label"><xsl:value-of select="$data/filter/label"/></label>
			</div>
			<div>
				<xsl:attribute name="class">
					<xsl:text>ff_container-filter__items</xsl:text>
					<xsl:if test="$data/filter/@modifier">
						<xsl:text> ff_container-filter__items--</xsl:text><xsl:value-of select="$data/filter/@modifier"/>
					</xsl:if>
				</xsl:attribute>
				<xsl:for-each select="$data//filter/set">
					<xsl:apply-templates select="." mode="ff_container-filter"/>
				</xsl:for-each>
			</div>
		</div>
	</div>
</xsl:template>

<xsl:template match="set" mode="ff_container-filter">
	<xsl:for-each select="module">
		<xsl:copy-of select="./node()"/>
	</xsl:for-each>
</xsl:template>