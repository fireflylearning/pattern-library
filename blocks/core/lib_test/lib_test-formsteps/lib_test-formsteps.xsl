<xsl:template name="lib_test-formsteps">
    <xsl:param name="data" />

    <div class="ff_container-page-header">
        
        <div class="ff_container-page-header__controls">
          <xsl:call-template name="ff_module-formsteps" >
              <xsl:with-param name="data" select="$data" />
          </xsl:call-template>
        </div>
     </div>

    <p>Other content</p>
    <div>
        <xsl:call-template name="ff_container-formstep-content">
            <xsl:with-param name="data" select="$data" />
        </xsl:call-template>
    </div>
</xsl:template>
