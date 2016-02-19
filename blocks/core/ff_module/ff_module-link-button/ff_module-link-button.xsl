<xsl:template name="ff_module-link-button">
    <xsl:param name="data" />
        <a type="button" title="{$data/link-button/text}" href="{$data/link-button/url}">
        
            <xsl:attribute name="class">
                <xsl:text>ff_module-link-button</xsl:text>
                <xsl:text> ff_module-link-button--</xsl:text><xsl:value-of select="$data/link-button/@modifier"/>
                <xsl:text> </xsl:text><xsl:value-of select="$data/link-button/@classes"/>
                <xsl:if test="$data/link-button/@disabled"> ff_module-link-button--is-disabled</xsl:if>
            </xsl:attribute>
            
            <xsl:if test="$data/link-button/data">
                <xsl:for-each select="$data/link-button/data">
                    <xsl:attribute name="{./@attr}">
                        <xsl:value-of select="."/>
                    </xsl:attribute>
                </xsl:for-each>
            </xsl:if>
            
            <xsl:if test="$data/link-button/@disabled">
                <xsl:attribute name="disabled">disabled</xsl:attribute>
            </xsl:if>
            
            <xsl:if test="$data/link-button/@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="$data/link-button/@id"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="$data/link-button/@icon">
                <span>
                    <xsl:attribute name="class">
                        <xsl:text>ff_icon ff_icon-</xsl:text><xsl:value-of select="$data/link-button/@icon"/>
                        <xsl:if test="not($data/link-button/@hide_text)"> ff_icon-left</xsl:if>
                    </xsl:attribute>
                </span>
            </xsl:if>
            <span>
                <xsl:attribute name="class">
                    <xsl:text>ff_module-link-button__content</xsl:text>
                    <xsl:if test="$data/link-button/@hide_text"> ff_module-link-button__content--hidden</xsl:if>
                </xsl:attribute>
                <xsl:value-of select="$data/link-button/text" />
            </span>
            
        </a>
</xsl:template>
