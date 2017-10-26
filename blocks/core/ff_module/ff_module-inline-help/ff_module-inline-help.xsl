<xsl:template name="ff_module-inline-help">
    <xsl:param name="data" />
        <button type="button" class="ff_module-inline-help" data-ff-control="help">

            <xsl:if test="$data/help/@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="$data/help/@id"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="$data/help/@target">
                <xsl:attribute name="data-ff-help-target">
                    <xsl:value-of select="$data/help/@target"/>
                </xsl:attribute>
            </xsl:if>

            <span class="ff_module-inline-help__content">
                <xsl:value-of select="$data/help" />
            </span>
            <span class="ff_module-inline-help__icon ff_icon"></span>
        </button>
</xsl:template>
