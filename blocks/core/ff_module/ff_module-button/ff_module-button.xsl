<xsl:template name="ff_module-button">
    <xsl:param name="data" />
        <button type="button" class="ff_module-button {$data/modifiers}">
            <xsl:if test="$data/id">
                <xsl:attribute name="id">
                    <xsl:value-of select="$data/id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="$data/action">
                <xsl:attribute name="data-ff-action"><xsl:value-of select="$data/action"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="$data/icon">
                <span class="ff_icon ff_icon-left ff_icon-{$data/icon}"/>
            </xsl:if>
            <span class="ff_module-button__content"><xsl:value-of select="$data/text"  /></span>
        </button>
</xsl:template>
