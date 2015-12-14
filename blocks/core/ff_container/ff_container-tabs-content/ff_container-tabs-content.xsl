<xsl:template name="ff_container-tabs-content">
	<xsl:param name="data" />

    <xsl:for-each select="$data/tabs/tab">
        <div>
            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="@active='true'">ff_container-tabs-content ff_container-tabs-content--active</xsl:when>
                    <xsl:otherwise>ff_container-tabs-content</xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
            <xsl:attribute name="data-ff-tabs-content">
                <xsl:value-of select="@id" />
            </xsl:attribute>
            <xsl:attribute name="id">
                <xsl:value-of select="@id" />
            </xsl:attribute>
            <span class="crate_util-block"><xsl:value-of select="content" /></span>
        </div>
    </xsl:for-each>

</xsl:template>
