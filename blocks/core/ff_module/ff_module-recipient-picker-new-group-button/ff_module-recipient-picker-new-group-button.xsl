<xsl:template name="ff_module-recipient-picker-new-group-button">
    <xsl:param name="data" />

    <div>
        <xsl:for-each select="$data/new-group-button" >
            <xsl:attribute name="{./@dataattr}">
                <xsl:text></xsl:text>
            </xsl:attribute>
        </xsl:for-each>

    </div>

</xsl:template>
