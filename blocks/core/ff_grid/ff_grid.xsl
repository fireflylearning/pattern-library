<xsl:template name="ff_grid">
    <xsl:param name="data" />
    

    <div class="ff_grid {$data/grid/@modifier}">
        <xsl:for-each select="$data/grid/column">
            <div class="ff_grid__column">
                <xsl:copy-of select="node()"/>
            </div>
        </xsl:for-each>
    </div>
        
    
</xsl:template>