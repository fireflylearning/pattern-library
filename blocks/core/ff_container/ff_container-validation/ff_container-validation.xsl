<xsl:template name="ff_container-validation">
	<xsl:param name="data" />

  <div>
    <xsl:attribute name="class">
      <xsl:text>ff_container-validation</xsl:text>
			<xsl:choose>
				<xsl:when test="$data/validation/@modifier"> ff_container-validation--<xsl:value-of select="$data/validation/@modifier"/></xsl:when>
				<xsl:otherwise> ff_container-validation--error</xsl:otherwise>
			</xsl:choose>
			<xsl:if test="$data/validation/@classes"><xsl:text> </xsl:text><xsl:value-of select="$data/validation/@classes" /></xsl:if>
			<xsl:if test="$data/validation/@active"> ff_container-validation--is-active</xsl:if>
    </xsl:attribute>

		<div class="ff_container-validation__content">
			<xsl:for-each select="$data/validation/modules/item">
				<xsl:copy-of select="./node()"/>
			</xsl:for-each>
		</div>

		<div class="ff_container-validation__message" data-ff-validation="message">
			<xsl:if test="$data/validation/@active">
				<xsl:value-of select="$data/validation/message"/>
			</xsl:if>
		</div>

  </div>
</xsl:template>
