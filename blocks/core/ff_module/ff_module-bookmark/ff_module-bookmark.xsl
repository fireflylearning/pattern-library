<xsl:template name="ff_module-bookmark">
    <xsl:param name="data" />

    <div class="ff_module-bookmark">
      
        <p class="ff_module-bookmark__label ff_module-bookmark__label--title">
            <a href="{$data/bookmark/@href}" class="ff_module-bookmark__link">
                <xsl:value-of select="$data/bookmark/label"/>
            </a>
        </p>

        <p class="ff_module-bookmark__label ff_module-bookmark__label--path">
            <xsl:value-of select="$data/bookmark/@path"/>
        </p>

        <p class="ff_module-bookmark__label ff_module-bookmark__label--meta">
            <xsl:value-of select="$data/bookmark/@meta"/>
            <xsl:if test="$data/bookmark/@from">
                <xsl:text> by </xsl:text>
                <a href="{$data/bookmark/@from-href}" class="ff_module-bookmark__from-link">
                    <xsl:value-of select="$data/bookmark/@from"/>
                </a>
            </xsl:if>
            <xsl:text> </xsl:text>
            <time datetime="{$data/bookmark/@date}">
                <xsl:value-of select="$data/bookmark/@date"/>
            </time>
        </p>

    </div>

</xsl:template>