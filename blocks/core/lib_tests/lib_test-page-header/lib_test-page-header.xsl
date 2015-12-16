<xsl:template name="lib_test-page-header">
<xsl:param name="data" />

    <div class="ff_container-page-header">
        
        <h1 class="ff_container-page-header__title">
            Add a task
        </h1>
        
        <div class="ff_container-page-header__controls">
            <xsl:call-template name="ff_module-formsteps">
                <xsl:with-param name="data" select="ext:node-set($data)"/>
            </xsl:call-template>
        </div>
        
    </div>

</xsl:template>