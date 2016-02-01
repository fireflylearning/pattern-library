<xsl:template name="ff_module-tabs-navigation">
    <xsl:param name="data" />
    <xsl:variable name="modifier" select="$data/tabs/@modifier"/>
    <xsl:variable name="class-with-mod">
        <xsl:choose>
            <xsl:when test="not($modifier='')">ff_module-tabs-navigation__tab ff_module-tabs-navigation__tab--<xsl:value-of select="$modifier"/></xsl:when>
            <xsl:otherwise>ff_module-tabs-navigation__tab</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <ul class="ff_module-tabs-navigation">
        <xsl:for-each select="$data/tabs/tab">
            <li data-ff-tabs-target="{@id}">
                <xsl:attribute name="class">
                    <xsl:choose>
                        <xsl:when test="not(@state='')"><xsl:value-of select="$class-with-mod"/> ff_module-tabs-navigation__tab--<xsl:value-of select="@state"/></xsl:when>
                        <xsl:otherwise>ff_module-tabs-navigation__tab</xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <a class="ff_module-tabs-navigation__link" href="#{@id}"><xsl:value-of select="label"/></a>
            </li>
        </xsl:for-each>
    </ul>
</xsl:template>
