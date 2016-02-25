<xsl:template name="lib_test-overlay">
    <xsl:param name="data" />

    <xsl:variable name="control-bar">
      <overlay modifier="{$data/overlay/@modifier}">
        <body>
          <item>
            <xsl:copy-of select="ext:node-set($data/overlay/body)"/>
          </item>
        </body>
        <bar>
          <item>
            <xsl:call-template name="ff_container-control-bar">
              <xsl:with-param name="data" select="ext:node-set($data/overlay/bar)"/>
            </xsl:call-template>
          </item>
        </bar>
      </overlay>
    </xsl:variable>



    <xsl:call-template name="ff_container-overlay">
      <xsl:with-param name="data" select="ext:node-set($control-bar)"/>
    </xsl:call-template>

</xsl:template>
