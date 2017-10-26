<xsl:template name="ff_module-form-box-member">
    <xsl:param name="data" />
    <xsl:variable name="profile" select="$data//page"/>

    <div class="ff_module-form-box-member">
        <xsl:attribute name="id">
           <xsl:choose>
               <xsl:when test="not($profile/@guid='')"><xsl:value-of select="$profile/@guid"/></xsl:when>
               <xsl:otherwise></xsl:otherwise>
           </xsl:choose>
        </xsl:attribute>
        <button class="ff_module-form-box-member__edit" data-edit="{$profile/@guid}" type="button" >
            <span class="ff_icon ff_module-form-box-group__edit--icon"></span>
        </button>
        <span class="ff_module-form-box-member__label"><xsl:value-of select="$profile/@title" /></span>
        <button class="ff_module-form-box-member__delete" type="button">
            <span class="ff_icon ff_module-form-box-group__delete--icon"></span>
        </button>
    </div>
</xsl:template>
