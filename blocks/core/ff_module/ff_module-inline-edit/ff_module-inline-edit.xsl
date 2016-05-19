<xsl:template name="ff_module-inline-edit">
    <xsl:param name="data" />
    <a>
        <xsl:if test="$data/edit/@id">
            <xsl:attribute name="id">
                <xsl:value-of select="$data/edit/@id"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="$data/edit/@url">
            <xsl:attribute name="href">
                <xsl:value-of select="$data/edit/@url"/>
            </xsl:attribute>
        </xsl:if>
        
        <xsl:if test="$data/edit/@hash">
            <xsl:attribute name="data-hash">
                <xsl:value-of select="$data/edit/@hash"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:attribute name="class">
            <xsl:choose>
                <xsl:when test="$data/edit/@class">ff_module-inline-edit <xsl:value-of select="$data/edit/@modifier"/></xsl:when>
                <xsl:otherwise>ff_module-inline-edit</xsl:otherwise>
            </xsl:choose>
        </xsl:attribute>
        <xsl:value-of select="$data/edit" /></a>
</xsl:template>
