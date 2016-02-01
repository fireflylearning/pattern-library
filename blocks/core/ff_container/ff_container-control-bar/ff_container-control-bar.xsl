<xsl:template name="ff_container-control-bar">
	<xsl:param name="data" />

    <xsl:variable name="modifier"><xsl:value-of select="$data//control-bar/@modifier"/></xsl:variable>

    <xsl:variable name="className">
        <xsl:choose>
            <xsl:when test="$modifier">ff_container-control-bar ff_container-control-bar--<xsl:value-of select="$modifier"/><xsl:text> </xsl:text><xsl:value-of select="$data//control-bar/@classes"/></xsl:when>
            <xsl:otherwise>ff_container-control-bar<xsl:text> </xsl:text><xsl:value-of select="$data//control-bar/@classes"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="{$className}">
        <xsl:for-each select="$data//control-bar/set">

            <div class="ff_container-control-bar__group" mode="ff_container-control-bar">
                <xsl:apply-templates select="." mode="ff_container-control-bar"/>
            </div>
        </xsl:for-each>
    </div>

</xsl:template>

<xsl:template match="set" mode="ff_container-control-bar">
    <xsl:if test="@title">
       <h3 class="ff_container-control-bar__title"><xsl:value-of select="@title"/></h3>
    </xsl:if>
    <xsl:for-each select="module">
        <xsl:copy-of select="./node()"/>
    </xsl:for-each>
</xsl:template>
