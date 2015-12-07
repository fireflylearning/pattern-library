<xsl:template name="ff_module-button">
    <xsl:param name="data" />
        <button class="ff_module-button {$data/modifiers}">
            <xsl:if test="$data/action">
                <xsl:attribute name="data-ff-action"><xsl:value-of select="$data/action"/></xsl:attribute>
            </xsl:if>
            <xsl:if test="$data/icon">
                <span class="ff_icon ff_icon-left ff_icon-{$data/icon}" />
            </xsl:if>
            <xsl:value-of select="$data/text" />
        </button>
</xsl:template>
