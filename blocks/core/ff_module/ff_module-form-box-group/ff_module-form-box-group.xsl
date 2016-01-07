<xsl:template name="ff_module-form-box-group">
    <xsl:param name="data" />
    <xsl:variable name="profile" select="$data//page"/>

    <xsl:variable name="state">
        <xsl:choose>
            <xsl:when test="$profile/@state = 'editable'">
                <xsl:text>ff_module-form-box-group--is-editable</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="ff_module-form-box-group {$state}">
        <xsl:attribute name="id">
           <xsl:choose>
               <xsl:when test="not($profile/@guid='')"><xsl:value-of select="$profile/@guid"/></xsl:when>
               <xsl:otherwise></xsl:otherwise>
           </xsl:choose>
        </xsl:attribute>
        <button class="ff_module-form-box-group__edit" data-edit="{$profile/@guid}" type="button" >
            <span class="ff_icon ff_icon-add-open-blue"></span>
        </button>
        <span class="ff_module-form-box-group__label"><xsl:value-of select="$profile/@title" /></span>
        <button class="ff_module-form-box-group__delete ff_module-form-box-group__delete" type="button">
            <span class="ff_icon ff_icon-cancel-open-blue"></span>
        </button>
    </div>
</xsl:template>
