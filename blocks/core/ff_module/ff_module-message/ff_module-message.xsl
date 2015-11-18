<xsl:template name="ff_module-message">
    <xsl:param name="data" />
    
    <div class="ff_module-message" id="$data/notice/@id">
        <p class="ff_module-message__label"><a href="{$data/notice/@url}" class="ff_module-message__link"><xsl:value-of select="$data/notice/htmlMessage"/></a></p>
        <p class="ff_module-message__label ff_module-message__label--meta">
            <a href="{@from_href}"><xsl:value-of select="$data/notice/@from"/></a>
            <xsl:text> </xsl:text>
            <time datetime="{$data/notice/@isodate}"><xsl:value-of select="$data/notice/@date"/></time>
        </p>
        <div class="ff_module-message__controls">
            <xsl:if test="$data/notice/@can_archive = 'yes'">
                <a href="#" class="ff_module-message__archive">Archive</a>
            </xsl:if>
        </div>
    </div>
    
</xsl:template>