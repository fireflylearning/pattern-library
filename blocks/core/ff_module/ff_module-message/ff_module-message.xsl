<xsl:template name="ff_module-message">
    <xsl:param name="data" />

    <div class="ff_module-message" id="{$data/notice/@id}">
        <p class="ff_module-message__label"><a href="{$data/notice/@url}" class="ff_module-message__link"><xsl:value-of select="$data/notice/htmlMessage"/></a></p>
        <p class="ff_module-message__label ff_module-message__label--meta">
            From<xsl:text> </xsl:text>
            <a href="{@from_href}" class="ff_module-message__link--meta"><xsl:value-of select="$data/notice/@from"/></a>
            <xsl:text> on </xsl:text>
            <time datetime="{$data/notice/@isodate}"><xsl:value-of select="$data/notice/@date"/></time>
        </p>
        <div class="ff_module-message__controls">
            <xsl:if test="$data/notice/@can_archive = 'yes'">
                <a href="#" class="ff_module-message__archive" title="Archive this message"><span class="ff_icon ff_icon-cancel-grey"></span></a>
            </xsl:if>
        </div>
    </div>

</xsl:template>
