<xsl:template name="ff_container-form-line">
    <xsl:param name="data" />
    <xsl:variable name="line" select="$data//form-line"/>
    <xsl:variable name="root-modifier">
        <xsl:choose>
            <xsl:when test="not($line/@modifier = '')">
                <xsl:value-of select="$line/@modifier" />
            </xsl:when>
            <xsl:otherwise>default</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="ff_container-form-line ff_container-form-line--{$root-modifier}">
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


            <span class="crate_util-block {$classes}"><xsl:value-of select="."/></span>


        </xsl:for-each>
    </div>
</xsl:template>
