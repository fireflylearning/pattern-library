<xsl:template name="ff_module-button">
    <xsl:param name="data" />
    <div class="ff_module-button {$data/modifiers}">
        <button>
            <xsl:if test="$data/icon">
                <span class="ff_icon ff_icon-left ff_icon-{$data/icon}" />
            </xsl:if>
            <xsl:value-of select="$data/text" /></button>
    </div>
</xsl:template>
