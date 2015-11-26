<xsl:template name="ff_module-button--is-disabled">
    <xsl:param name="data" />
        <button class="ff_module-button {$data/modifiers} ff_module-button--is-disabled" disabled="disabled">
            <xsl:if test="$data/icon">
                <span class="ff_icon ff_icon-left ff_icon-{$data/icon}" />
            </xsl:if>
            <xsl:value-of select="$data/text" />
        </button>
</xsl:template>
