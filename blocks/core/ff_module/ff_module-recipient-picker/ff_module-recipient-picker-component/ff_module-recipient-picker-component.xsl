<xsl:template name="ff_module-recipient-picker-component">
    <xsl:param name="data" />

    <div>
        <xsl:for-each select="$data/picker" >
            <xsl:attribute name="{./@dataattr}">
                <xsl:text></xsl:text>
            </xsl:attribute>
        </xsl:for-each>
    </div>
</xsl:template>
