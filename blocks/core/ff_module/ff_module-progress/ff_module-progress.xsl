<xsl:template name="ff_module-progress">
    <xsl:param name="data" />
    
    <xsl:variable name="completed">
        <xsl:value-of select="format-number(($data/progress/@completed_by div $data/progress/@sent_to) * 100, '#')"/><xsl:text>%</xsl:text>
    </xsl:variable>
    
    <div class="ff_module-progress">
        <div class="ff-module-progress__completed">
            <span class="ff-module-progress__label"><xsl:value-of select="$completed"/></span>
        </div>
    </div>
    
</xsl:template>