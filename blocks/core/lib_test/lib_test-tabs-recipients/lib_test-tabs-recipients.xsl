<xsl:template name="lib_test-tabs-recipients">
    <xsl:param name="data" />

    <div data-ff-recipient-picker-tabs=""></div>

    <div data-ff-recipient-picker-new-group-button-tabs=""></div>

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
                <!--<xsl:call-template name="ff_module-recipient-button-list">
                    <xsl:with-param name="data" select="ext:node-set(./results)" />
                </xsl:call-template>-->

            </div>
        </xsl:for-each>


    </div>
</xsl:template>
