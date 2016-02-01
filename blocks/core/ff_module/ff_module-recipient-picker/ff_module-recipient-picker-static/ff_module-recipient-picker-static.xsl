<xsl:template name="ff_module-recipient-picker-static">
    <xsl:param name="data" />

    <xsl:variable name="state">
        <xsl:call-template name="ff_module-recipient-picker-format-suffix">
            <xsl:with-param name="prefix">ff_module-recipient-picker__selectable</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="$data/profiles/@state"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>

    <div class="ff_module-recipient-picker">
        <div class="ff_module-recipient-picker__main">

            <xsl:call-template name="ff_module-recipient-picker-selected-list">
                <xsl:with-param name="data" select="ext:node-set($data//selected)"/>
            </xsl:call-template>

            <input class="ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible"/>

        </div>
        <div class="ff_module-recipient-picker__selectable {$state}">
            <xsl:call-template name="ff_module-recipient-button-list-static">
                <xsl:with-param name="data" select="ext:node-set($data//results)"/>
            </xsl:call-template>
        </div>
    </div>
</xsl:template>

<xsl:template name="ff_module-recipient-picker-format-suffix">
    <xsl:param name="prefix"/>
    <xsl:param name="suffix"/>
    <xsl:choose>
        <xsl:when test="not($suffix = '')">
            <xsl:value-of select="$prefix"/>--<xsl:value-of select="$suffix"/>
        </xsl:when>
        <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
</xsl:template>
