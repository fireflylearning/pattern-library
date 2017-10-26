 <xsl:template name="ff_module-task-mark">
    <xsl:param name="data" />

    <xsl:variable name="nodes">
        <mark achieved="{$data/mark/@achieved}" possible="{$data/mark/@possible}" grade_level="{$data/mark/@grade_level}" />
    </xsl:variable>
    <xsl:variable name="mark-and-grade" select="ext:node-set($nodes)" />

    <dl>
        <xsl:attribute name="class">
            <xsl:text>ff_module-task-mark</xsl:text>
        </xsl:attribute>
        <xsl:attribute name="id">
            <xsl:if test="$data/mark/@id">
                <xsl:value-of select="$data/mark/@id"/>
            </xsl:if>
        </xsl:attribute>
        <dt class="ff_module-task-mark__item ff_module-task-mark__item--title">
            <a href="{$data/mark/@postback_href}" class="ff_module-task-mark__link"><xsl:value-of select="$data/mark/@assignment"/></a>
            <p class="ff_module-task-mark__to"><xsl:value-of select="$data/mark/@to"/></p>
        </dt>
        <dd class="ff_module-task-mark__item ff_module-task-mark__item--mark-and-grade">
            <xsl:call-template name="ff_module-mark-and-grade">
                <xsl:with-param name="data" select="$mark-and-grade"/>
            </xsl:call-template>
        </dd>
    </dl>
</xsl:template>
