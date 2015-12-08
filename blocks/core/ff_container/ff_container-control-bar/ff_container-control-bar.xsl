<xsl:template name="ff_container-control-bar">
	<xsl:param name="data" />

    <div class="ff_container-control-bar {$data/control-bar/@modifiers}">
        <xsl:choose>
            <xsl:when test="count($data/control-bar/set) &gt; 1">
                <xsl:for-each select="$data/control-bar/set">
                    <div class="ff_container-control-bar__group" mode="ff_contianer-control-bar">
                        <xsl:apply-templates select="." mode="ff_contianer-control-bar"/>
                    </div>
                </xsl:for-each>
            </xsl:when>
            <xsl:otherwise>
                <xsl:apply-templates select="$data/control-bar/set" mode="ff_contianer-control-bar"/>
            </xsl:otherwise>
        </xsl:choose>
    </div>

</xsl:template>

<xsl:template match="set" mode="ff_contianer-control-bar">
    <xsl:if test="@title">
       <h3 class="ff_util-prose__section-heading"><xsl:value-of select="@title"/></h3> 
    </xsl:if>
    <xsl:for-each select="module">
        <span class="crate_util-block"><xsl:value-of select="."/></span>
    </xsl:for-each>
</xsl:template>