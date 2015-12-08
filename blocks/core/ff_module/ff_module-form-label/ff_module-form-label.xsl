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
        <xsl:if test="$label/data">
            <xsl:for-each select="$label/data">
                <xsl:attribute name="{./@attr}">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </xsl:for-each>
        </xsl:if>
        <xsl:value-of select="$label/text" />
        <xsl:if test="$label/@required='false'">
            <span class="ff_module-form-label__optional"> (optional)</span>
        </xsl:if>

    </label>

</xsl:template>
