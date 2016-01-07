<xsl:template name="lib_test-recipient-picker">
    <xsl:param name="data" />

    <div class="ff_container-page">

        <h2>Select recipients</h2>

        <div class="ff_grid ff_grid--1-1">
            <div class="ff_grid__column">

                <xsl:call-template name="ff_module-recipient-picker-component" >
                    <xsl:with-param name="data" select="$data" />
                </xsl:call-template>

                <xsl:call-template name="ff_module-recipient-picker-new-group-button">
                    <xsl:with-param name="data" select="$data" />
                </xsl:call-template>
            </div>
            <div class="ff_grid__column">

                <div data-ff-tabs="">
                    <xsl:call-template name="ff_module-tabs-navigation" >
                        <xsl:with-param name="data" select="$data" />
                    </xsl:call-template>

                    <xsl:call-template name="ff_container-tabs-content" >
                        <xsl:with-param name="data" select="$data" />
                    </xsl:call-template>

                </div>
            </div>
        </div>
    </div>



</xsl:template>
