<xsl:template name="ff_container-control-bar">
	<xsl:param name="data" />

    <div class="ff_container-control-bar {$data/control-bar/@modifiers}">
        <xsl:for-each select="$data/control-bar/set">
            <div class="ff_container-control-bar__group" mode="ff_container-control-bar">
                <xsl:apply-templates select="." mode="ff_container-control-bar"/>
            </div>
        </xsl:for-each>
    </div>

</xsl:template>

<xsl:template match="set" mode="ff_container-control-bar">
    <xsl:if test="@title">
       <h3 class="ff_util-prose__section-heading"><xsl:value-of select="@title"/></h3>
    </xsl:if>
    <xsl:for-each select="module">
        <span class="crate_util-block"><xsl:value-of select="."/></span>
    </xsl:for-each>
</xsl:template>
