<xsl:template name="ff_module-inline-edit">
    <xsl:param name="data" />
        <button type="button" class="ff_module-inline-edit" data-ff-control="edit">

            <xsl:if test="$data/edit/@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="$data/edit/@id"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="$data/edit/@target">
                <xsl:attribute name="data-ff-edit-target">
                    <xsl:value-of select="$data/edit/@target"/>
                </xsl:attribute>
            </xsl:if>

            <span class="ff_module-inline-edit__content">
                <xsl:value-of select="$data/edit" />
            </span>
        </button>
</xsl:template>
