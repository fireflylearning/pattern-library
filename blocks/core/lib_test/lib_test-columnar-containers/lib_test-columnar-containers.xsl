<xsl:template name="lib_test-columnar-containers">
    <xsl:param name="data" />  
    <xsl:variable name="columnar-list">
        <item title="init" more-page-text="moar" more-page-link="#" show-footer="yes">
            <module>
                <xsl:call-template name="ff_module-columnar-list">
                    <xsl:with-param name="data" select="$data" />
                </xsl:call-template>
            </module>
        </item>
    </xsl:variable>
    <xsl:call-template name="ff_container-landing-section" >
        <xsl:with-param name="data" select="ext:node-set($columnar-list)" />
    </xsl:call-template>
</xsl:template>