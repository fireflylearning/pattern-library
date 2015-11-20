<xsl:template name="ff_module-task">
    <xsl:param name="data" />
    
    <xsl:variable name="nodes">
        <progress sent_to="{$data/notice/@sent_to}" no_excused="{$data/notice/@no_excused}" completed_by="{$data/notice/@handedin}" marked="{$data/notice/@marked}"/>
    </xsl:variable>
    <xsl:variable name="progress-bar" select="ext:node-set($nodes)" />
    
    <dl class="ff_module-task">
        <dt class="ff_module-task__item ff_module-task__item--title"><a href="#" class="ff_module-task__link"><xsl:value-of select="$data/notice/htmlMessage"/></a></dt>
        <dd class="ff_module-task__item ff_module-task__item--to"><xsl:value-of select="$data/notice/@to"/></dd>
        <dd class="ff_module-task__item ff_module-task__item--date">Due <time><xsl:value-of select="$data/notice/@duedate"/></time></dd>
        <dd class="ff_module-task__item ff_module-task__item--progress">
            <xsl:call-template name="ff_module-progress">
                <xsl:with-param name="data" select="$progress-bar"/>
            </xsl:call-template>
        </dd>
        <dd class="ff_module-task__item ff_module-task__item--from"><xsl:value-of select="$data/notice/@from"/></dd>
    </dl>
    
    
    
</xsl:template>