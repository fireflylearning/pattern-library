<xsl:template name="ff_icon-svg">
    <xsl:param name="data" />
    <svg>
      <xsl:attribute name="class">
        <xsl:text>ff_icon-svg</xsl:text>
        <xsl:if test="$data/svg-icon/@modifier"> ff_icon-svg--<xsl:value-of select="$data/svg-icon/@modifier"/></xsl:if>
        <xsl:if test="$data/svg-icon/@classes"><xsl:text> </xsl:text><xsl:value-of select="$data/svg-icon/@classes"/></xsl:if>
      </xsl:attribute>
      <xsl:variable name="base">
        <xsl:choose>
          <xsl:when test="$data/svg-icon/@base"><xsl:value-of select="$data/svg-icon/@base"/></xsl:when>
          <xsl:otherwise>/Templates/lib/core/patterns/icons/sprites.svg#ff_icon-</xsl:otherwise>
        </xsl:choose>
      </xsl:variable>
      <use xlink:href="{$base}{$data/svg-icon/@name}"/>
    </svg>
</xsl:template>
