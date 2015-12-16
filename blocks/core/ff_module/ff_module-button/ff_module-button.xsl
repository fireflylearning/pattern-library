<xsl:template name="ff_module-button">
    <xsl:param name="data" />
        <button type="button" title="{$data/button/text}">
            <xsl:attribute name="class">
                <xsl:text>ff_module-button</xsl:text>
                <xsl:text> ff_module-button--</xsl:text><xsl:value-of select="$data/button/@modifier"/>
                <xsl:text> </xsl:text><xsl:value-of select="$data/button/@classes"/>
                <xsl:if test="$data/button/@disabled"> ff_module-button--is-disabled</xsl:if>
            </xsl:attribute>
            
            <xsl:if test="$data/button/@disabled">
                <xsl:attribute name="disabled">disabled</xsl:attribute>
            </xsl:if>
            
            <xsl:if test="$data/button/@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="$data/button/@id"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="$data/action">
                <xsl:attribute name="data-ff-action"><xsl:value-of select="$data/action"/></xsl:attribute>
            </xsl:if>

            <xsl:if test="$data/button/@icon">
                <span>
                    <xsl:attribute name="class">
                        <xsl:text>ff_icon ff_icon-</xsl:text><xsl:value-of select="$data/button/@icon"/>
                        <xsl:if test="not($data/button/@hide_text)"> ff_icon-left</xsl:if>
                    </xsl:attribute>
                </span>

            </xsl:if>
            <span>
                <xsl:attribute name="class">
                    <xsl:text>ff_module-button__content</xsl:text>
                    <xsl:if test="$data/button/@hide_text"> ff_module-button__content--hidden</xsl:if>
                </xsl:attribute>
                <xsl:value-of select="$data/button/text" />
            </span>
            
        </button>
</xsl:template>
