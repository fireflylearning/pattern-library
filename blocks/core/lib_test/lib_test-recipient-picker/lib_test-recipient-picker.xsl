<xsl:template name="lib_test-recipient-picker">
    <xsl:param name="data" />

    <div class="ff_container-page">


        <h2>Select recipients</h2>

        <div class="ff_grid ff_grid--1-1">
            <div class="ff_grid__column">
                <div data-ff-recipient-picker-tabs=""></div>
                <div data-ff-recipient-picker-new-group-button-tabs=""></div>
            </div>
            <div class="ff_grid__column">

                <div data-ff-tabs="">
                    <xsl:call-template name="ff_module-tabs-navigation" >
                        <xsl:with-param name="data" select="$data" />
                    </xsl:call-template>

                    <xsl:variable name="modifier" select="$data/tabs/@modifier"/>

                    <xsl:for-each select="$data/tabs/tab">
                        <div>
                            <xsl:attribute name="class">
                                <xsl:choose>
                                    <xsl:when test="not($modifier='') and not(@active='true')">ff_container-tabs-content ff_container-tabs-content--<xsl:value-of select="$modifier"/></xsl:when>
                                    <xsl:when test="not($modifier='') and @active='true'">ff_container-tabs-content ff_container-tabs-content--<xsl:value-of select="$modifier"/> ff_container-tabs-content--is-active</xsl:when>
                                    <xsl:when test="$modifier='' and @active='true'">ff_container-tabs-content ff_container-tabs-content--is-active</xsl:when>
                                    <xsl:otherwise>ff_container-tabs-content</xsl:otherwise>
                                </xsl:choose>
                            </xsl:attribute>
                            <xsl:attribute name="data-ff-tabs-content">
                                <xsl:value-of select="@id" />
                            </xsl:attribute>
                            <xsl:attribute name="id">
                                <xsl:value-of select="@id" />
                            </xsl:attribute>

                            <div data-ff-recipient-list-type="{@id}"/>

                        </div>
                    </xsl:for-each>


                </div>
            </div>
        </div>
    </div>



</xsl:template>
