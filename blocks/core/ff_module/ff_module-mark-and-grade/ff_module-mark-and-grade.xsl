<xsl:template name="ff_module-mark-and-grade">
    <xsl:param name="data" />

    <p class="ff_module-mark-and-grade">
        <xsl:if test="$data/mark/@achieved != '-1' and $data/mark/@achieved != ''">
            <span class="ff_module-mark-and-grade__mark"><xsl:value-of select="$data/mark/@achieved"/>/<xsl:value-of select="$data/mark/@possible"/></span>
        </xsl:if>
        <xsl:if test="$data/mark/@achieved != '-1' and $data/mark/@achieved != '' and $data/mark/@grade_level != ''">
            <span>&#160;</span>
        </xsl:if>
        <xsl:if test="$data/mark/@grade_level != ''">
            <span class="ff_module-mark-and-grade__grade"><xsl:value-of select="$data/mark/@grade_level"/></span>
        </xsl:if>
    </p>
</xsl:template>