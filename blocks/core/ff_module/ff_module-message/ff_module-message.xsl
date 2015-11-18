<xsl:template name="ff_module-message">
    <xsl:param name="data" />
    
    <xsl:for-each select="$data/messages/notice">
        <div class="ff_module-message" id="@id">
            <div class="ff_module-message__text ff_util-prose">
                <p><a href="{@url}" class="ff_module-message__link"><xsl:value-of select="htmlMessage"/></a></p>
            </div>
            <div class="ff_module-message__meta ff_util-prose">
                <p>
                    <a href="{@from_href}"><xsl:value-of select="@from"/></a>
                    <xsl:text> </xsl:text>
                    <time datetime="{@isodate}"><xsl:value-of select="@date"/></time>
                </p>
            </div>
            <div class="ff_module-message__controls">
                <xsl:if test="@can_archive = 'yes'">
                    <a href="#" class="ff_module-message__archive">Archive</a>
                </xsl:if>
            </div>
        </div>
    </xsl:for-each>
    
</xsl:template>