<xsl:template name="ff_container-form-line">
    <xsl:param name="data" />
    <xsl:variable name="line" select="$data//form-line"/>

    <div class="ff_container-form-line">
        <xsl:for-each select="$line/*">

            <xsl:variable name="classes">
                <xsl:choose>
                <xsl:when test="./@modifier">
                    <xsl:text>ff_container-form-line__item ff_container-form-line__item--</xsl:text><xsl:value-of select="./@modifier"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:text>ff_container-form-line__item</xsl:text>
                </xsl:otherwise>
                </xsl:choose>
            </xsl:variable>


            <xsl:copy-of select="node()"/>


        </xsl:for-each>
    </div>
</xsl:template>
