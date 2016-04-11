<xsl:template name="ff_container-form-line">
    <xsl:param name="data" />
    <xsl:variable name="line" select="$data//form-line"/>

    <div class="ff_container-form-line">
        <xsl:for-each select="$line">
            <xsl:for-each select="item/node()">
            <xsl:copy>
                <xsl:attribute name="class">
                    <xsl:choose>
                    <xsl:when test="boolean(../@modifier = '')">
                        <xsl:text>ff_container-form-line__item</xsl:text>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:text>ff_container-form-line__item ff_container-form-line__item--</xsl:text><xsl:value-of select="../@modifier"/>
                    </xsl:otherwise>
                    </xsl:choose>
                </xsl:attribute>
                <xsl:apply-templates select="@*|node()" mode="ff_container-form-line__attribute-transform"/>
            </xsl:copy>
        </xsl:for-each>
        </xsl:for-each>
    </div>
</xsl:template>

<xsl:template match="@*|node()" mode="ff_container-form-line__attribute-transform">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()" mode="ff_container-form-line__attribute-transform"/>
    </xsl:copy>
</xsl:template>
