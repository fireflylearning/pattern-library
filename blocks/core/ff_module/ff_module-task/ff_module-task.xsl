<xsl:template name="ff_module-task">
    <xsl:param name="data" />
    
    <xsl:variable name="nodes">
        <progress sent_to="{$data/notice/@sent_to}" no_excused="{$data/notice/@no_excused}" completed_by="{$data/notice/@handedin}" marked="{$data/notice/@marked}"/>
    </xsl:variable>
    <xsl:variable name="progress-bar" select="ext:node-set($nodes)" />
    
    <dl>
        <xsl:attribute name="class">
            <xsl:text>ff_module-task</xsl:text>
            <xsl:if test="$data/notice/@modifier">
                <xsl:text> ff_module-task--</xsl:text><xsl:value-of select="$data/notice/@modifier"/>
            </xsl:if>
        </xsl:attribute>
        <dt class="ff_module-task__item ff_module-task__item--title">
            <a href="{$data/notice/@href}" class="ff_module-task__link"><xsl:value-of select="$data/notice/htmlMessage"/></a>
            <xsl:if test="$data/notice/@from">
                <span class="ff_module-task__meta">Set by <xsl:value-of select="$data/notice/@from"/></span>
            </xsl:if>
        </dt>
        <dd class="ff_module-task__item ff_module-task__item--to"><xsl:value-of select="$data/notice/@to"/></dd>
        <dd class="ff_module-task__item ff_module-task__item--date"><xsl:if test="not($data/notice/@duedate = '')">Due </xsl:if><time><xsl:value-of select="$data/notice/@duedate"/></time></dd>
        <dd class="ff_module-task__item ff_module-task__item--progress">
            <xsl:call-template name="ff_module-progress">
                <xsl:with-param name="data" select="$progress-bar"/>
            </xsl:call-template>
        </dd>
    </dl>
    
    
    
</xsl:template>