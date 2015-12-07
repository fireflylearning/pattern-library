<xsl:template name="ff_module-form-label">
    <xsl:param name="data" />
    <xsl:variable name="label" select="$data/label"/>
    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($label/@modifier = '')">
                <xsl:value-of select="$label/@modifier" />
            </xsl:when>
            <xsl:otherwise>default</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <label class="ff_module-form-label ff_module-form-label--{$modifier} {$label/@classes}">
        <xsl:if test="not($label/@for='')">
            <xsl:attribute name="for">
                <xsl:value-of select="$label/@for"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="$label" />
    </label>

</xsl:template>
