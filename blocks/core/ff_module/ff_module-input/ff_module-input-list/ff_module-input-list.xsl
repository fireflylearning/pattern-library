<xsl:template name="ff_module-input-list">
    <xsl:param name="data" />


    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($data/inputs/@modifier = '')">
                ff_module-input-list__item--<xsl:value-of select="$data/inputs/@modifier" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <ul class="ff_module-input-list">
        <xsl:for-each select="$data//input">
            <xsl:variable name="type">
                <xsl:choose>
                    <xsl:when test="not(./@type = '')">
                        <xsl:value-of select="./@type" />
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>radio</xsl:text>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>

            <xsl:variable name="input">
                <xsl:copy-of select="."/>
            </xsl:variable>
            <xsl:choose>
                <xsl:when test="$type = 'radio'">
                    <li class="ff_module-input-list__item {$modifier}">
                        <xsl:call-template name="ff_module-input-radio">
                            <xsl:with-param name="data" select="$input"/>
                        </xsl:call-template>
                    </li>
                </xsl:when>
                <xsl:when test="$type = 'checkbox'">
                    <li class="ff_module-input-list__item {$modifier}">
                        <xsl:call-template name="ff_module-input-checkbox">
                            <xsl:with-param name="data" select="$input"/>
                        </xsl:call-template>
                    </li>
                </xsl:when>
            </xsl:choose>

        </xsl:for-each>
    </ul>

</xsl:template>
