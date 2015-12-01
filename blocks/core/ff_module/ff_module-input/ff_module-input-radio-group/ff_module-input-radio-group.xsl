<xsl:template name="ff_module-input-radio-group">
    <xsl:param name="data" />


    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($data/inputs/@modifier = '')">
                ff_module-input-radio-group__item--<xsl:value-of select="$data/inputs/@modifier" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <ul class="ff_module-input-radio-group">
        <xsl:for-each select="$data//input">
            <xsl:variable name="input">
                <xsl:copy-of select="."/>
            </xsl:variable>
            <li class="ff_module-input-radio-group__item {$modifier}">
                <xsl:call-template name="ff_module-input-radio">
                    <xsl:with-param name="data" select="$input"/>
                </xsl:call-template>
            </li>
        </xsl:for-each>
    </ul>

</xsl:template>
