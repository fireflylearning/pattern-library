<xsl:template name="lib_test-tabs">
    <xsl:param name="data" />
    <div data-ff-tabs="">
        <xsl:call-template name="ff_module-tabs-navigation" >
            <xsl:with-param name="data" select="$data" />
        </xsl:call-template>
        <xsl:call-template name="ff_container-tabs-content">
            <xsl:with-param name="data" select="$data" />
        </xsl:call-template>
    </div>
</xsl:template>
