<xsl:template name="ff_module-input-group">
    <xsl:param name="data" />
    <xsl:variable name="input" select="$data//input"/>

    <xsl:variable name="state">
        <xsl:choose>
            <xsl:when test="$input/@state = 'editable'">
                <xsl:text>ff_module-input-group--is-editable</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="ff_module-input-group {$state}">
        <xsl:attribute name="id">
           <xsl:choose>
               <xsl:when test="not($input/@id='')"><xsl:value-of select="$input/@id"/></xsl:when>
               <xsl:otherwise></xsl:otherwise>
           </xsl:choose>
        </xsl:attribute>
        <button class="ff_module-input-group__edit" data-edit="{$input/@id}" type="button" >
            <span class="ff_icon ff_icon-edit-input-box"></span>
        </button>
        <span class="ff_module-input-group__label"><xsl:value-of select="$input" /></span>
        <button class="ff_module-input-group__delete ff_module-input-group__delete" data-delete="${input/@id}" type="button">
            <span class="ff_icon ff_icon-delete"></span>
        </button>
    </div>
</xsl:template>
