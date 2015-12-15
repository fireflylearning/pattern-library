<xsl:template name="ff_module-tabs-navigation">
    <xsl:param name="data" />

    <ul class="ff_module-tabs-navigation">
        <xsl:for-each select="$data/tabs/tab">
            <li data-ff-tabs-target="{@id}">
                <xsl:attribute name="class">
                    <xsl:choose>
                        <xsl:when test="@active='true'">ff_module-tabs-navigation__tab ff_module-tabs-navigation__tab--active</xsl:when>
                        <xsl:otherwise>ff_module-tabs-navigation__tab</xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <a class="ff_module-tabs-navigation__link" href="#{@id}"><xsl:value-of select="label"/></a>
            </li>
        </xsl:for-each>
    </ul>
</xsl:template>
