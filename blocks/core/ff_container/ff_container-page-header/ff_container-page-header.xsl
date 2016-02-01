<xsl:template name="ff_container-page-header">
	<xsl:param name="data" />

    <div class="ff_container-page-header">
        <h1 class="ff_container-page-header__title">
            <xsl:value-of select="$data/page-header/@title"/>
        </h1>
        <xsl:if test="$data/page-header/controls">
            <div class="ff_container-page-header__controls">
                <xsl:copy-of select="$data//controls/content/node()"/>
            </div>
        </xsl:if>
    </div>

</xsl:template>
