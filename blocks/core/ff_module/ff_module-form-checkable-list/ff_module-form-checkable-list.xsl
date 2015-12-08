<xsl:template name="ff_module-form-checkable-list">
    <xsl:param name="data" />


    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($data/form-pairs/@modifier = '')">
                ff_module-form-checkable-list__item--<xsl:value-of select="$data/form-pairs/@modifier" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <ul class="ff_module-form-checkable-list">
        <xsl:for-each select="$data//form-pair">

            <xsl:variable name="form-pair">
                <xsl:copy-of select="."/>
            </xsl:variable>

            <li class="ff_module-form-checkable-list__item {$modifier}">
                <xsl:call-template name="ff_module-form-pair">
                    <xsl:with-param name="data" select="ext:node-set($form-pair)"/>
                </xsl:call-template>
            </li>

        </xsl:for-each>
    </ul>

</xsl:template>
