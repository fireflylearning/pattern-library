<xsl:template name="ff_module-count-indicator">
    <xsl:param name="data" />

    <span class="ff_module-count-indicator">
        <xsl:attribute name="class">
            <xsl:text>ff_module-count-indicator</xsl:text>
            <xsl:if test="$data/item/@modifier"> ff_module-count-indicator--<xsl:value-of select="$data/item/@modifier"/></xsl:if>
            <xsl:if test="$data/item/@classes"><xsl:value-of select="concat(' ', $data/item/@classes)"/></xsl:if>
        </xsl:attribute>
        
        <xsl:if test="$data/item/@title">
            <xsl:attribute name="title">
                <xsl:value-of select="$data/item/@title"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:value-of select="$data//item/@count"/>
    </span>

</xsl:template>
