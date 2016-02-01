<xsl:template name="ff_container-tabs-content">
	<xsl:param name="data" />
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
            <xsl:copy-of select="content/node()"/>
        </div>
    </xsl:for-each>

</xsl:template>
