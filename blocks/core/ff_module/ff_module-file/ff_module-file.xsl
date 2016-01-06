<xsl:template name="ff_module-file">
    <xsl:param name="data" />

    <div class="ff_module-file">

        <xsl:attribute name="class">
            <xsl:text>ff_module-file</xsl:text>
            <xsl:text> </xsl:text><xsl:value-of select="$data//attachment/@classes"/>
        </xsl:attribute>
        
        <xsl:if test="$data//attachment/data">
            <xsl:for-each select="$data//attachment/data">
                <xsl:attribute name="{./@attr}">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </xsl:for-each>
        </xsl:if>

        <span>
            <xsl:attribute name="class">
                <xsl:text>ff_module-file__icon ff_icon ff_icon-left</xsl:text>
                <xsl:choose>
                    <xsl:when test="$data//attachment/@type = 'page'"> ff_icon-computer</xsl:when>
                    <xsl:otherwise> ff_icon-file</xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>
        </span>

        <xsl:choose>
            <xsl:when test="$data//attachment/@href">
                <a href="{$data//attachment/@href}" class="ff_module-file__link">
                    <span class="ff_module-file__title"><xsl:value-of select="$data//attachment/@title"/></span>
                </a>
            </xsl:when>
            <xsl:otherwise>
                <span class="ff_module-file__title"><xsl:value-of select="$data//attachment/@title"/></span>
            </xsl:otherwise>
        </xsl:choose>
        

    </div>

</xsl:template>
