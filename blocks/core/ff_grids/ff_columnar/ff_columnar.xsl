<xsl:template name="ff_columnar">
    <xsl:param name="data" />
    <div class="ff_columnar ff_columnar--{$data/grid/@modifier}">
        <xsl:for-each select="$data/grid/column">
            <div class="ff_columnar__column">
                <xsl:copy-of select="node()"/>
            </div>
        </xsl:for-each>
    </div>
</xsl:template>