<xsl:template name="ff_module-button">
    <xsl:param name="data" />
        <button type="button" class="ff_module-button {$data/modifiers}" id="{$data/id}">
            <xsl:if test="$data/icon">
                <span class="ff_icon ff_icon-left ff_icon-{$data/icon}"/>
            </xsl:if>
            <span class="ff_module-button__content"><xsl:value-of select="$data/text"  /></span>
        </button>
</xsl:template>
