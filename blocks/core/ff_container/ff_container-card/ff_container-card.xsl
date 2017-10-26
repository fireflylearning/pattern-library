<xsl:template name="ff_container-card">
    <xsl:param name="data"/>
    <xsl:variable name="card" select="$data/card"/>

    <div>
        <xsl:attribute name="class">
            <xsl:choose>
                <xsl:when test="$card/@modifier">ff_container-card ff_container-card--<xsl:value-of select="$card/@modifier"/></xsl:when>
                <xsl:otherwise>ff_container-card</xsl:otherwise>
            </xsl:choose>
        </xsl:attribute>
        <div class="ff_container-card__header">
            <h3 class="ff_container-card__title">
                <xsl:value-of select="$card/@title"/>
            </h3>
        </div>
        <div class="ff_container-card__content">
            <ul class="ff_container-card__items">
                <xsl:for-each select="$card/items/item">
                   <li class="ff_container-card__item"><xsl:copy-of select="node()"/></li>
                </xsl:for-each>
            </ul>
        </div>
    </div>
</xsl:template>  