<xsl:template name="ff_module-input-group">
    <xsl:param name="data" />
    <xsl:variable name="input" select="$data//input"/>
    <div class="ff_module-input-group">
        <xsl:attribute name="id">
           <xsl:choose>
               <xsl:when test="not($input/@id='')"><xsl:value-of select="$input/@id"/></xsl:when>
               <xsl:otherwise></xsl:otherwise>
           </xsl:choose>
        </xsl:attribute>
        <span class="ff_module-input-group__name"><xsl:value-of select="$input" /></span>
        <button class="ff_module-input-group__delete" data-delete="${input/@id}" type="button">
            <span class="ff_icon ff_icon-delete"></span>
        </button>
    </div>
</xsl:template>
