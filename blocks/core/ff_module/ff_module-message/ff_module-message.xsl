<xsl:template name="ff_module-message">
    <xsl:param name="data" />
    
    <xsl:for-each select="$data/messages/message">
        <div class="ff_module-message">
            <div class="ff_module-message__text">
                <p><a href="{@url}"><xsl:value-of select="@text"/></a></p>
            </div>
            <div class="ff_module-message__meta">
                <p>
                    <a href="{@author_profile}"><xsl:value-of select="@author"/></a>
                    <xsl:text> </xsl:text>
                    <time datetime="{@date}"><xsl:value-of select="@nice_date"/></time>
                </p>
            </div>
        </div>
    </xsl:for-each>
    
</xsl:template>