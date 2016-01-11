<xsl:template name="lib_test-formsteps">
    <xsl:param name="data" />

    <div class="ff_container-page-header">
        <h1 class="ff_container-page-header__title">Page title</h1>
        <xsl:call-template name="ff_module-formsteps" >
            <xsl:with-param name="data" select="$data" />
        </xsl:call-template>
     </div>

    <p>Other content</p>
    <div>
        <xsl:call-template name="ff_container-formstep-content">
            <xsl:with-param name="data" select="$data" />
        </xsl:call-template>
    </div>
</xsl:template>
