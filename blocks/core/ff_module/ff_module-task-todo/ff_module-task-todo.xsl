 <xsl:template name="ff_module-task-todo">
    <xsl:param name="data" />

    <dl>
        <xsl:attribute name="class">
            <xsl:text>ff_module-task-todo</xsl:text>
            <xsl:if test="$data/notice/@modifier">
                <xsl:text> ff_module-task-todo--</xsl:text><xsl:value-of select="$data/notice/@modifier"/>
            </xsl:if>
        </xsl:attribute>
        <xsl:attribute name="id">
            <xsl:if test="$data/notice/@id">
                <xsl:value-of select="$data/notice/@id"/>
            </xsl:if>
        </xsl:attribute>
        <xsl:if test="$data/notice/@has_checkbox">
            <dd class="ff_module-task-todo__item ff_module-task-todo__item--checkbox">
                <xsl:call-template name="ff_module-form-input">
                    <xsl:with-param name="data" select="$data"/>
                </xsl:call-template>
            </dd>
        </xsl:if>
        <dt class="ff_module-task-todo__item ff_module-task-todo__item--title">
            <p class="ff_module-task-todo__to"><xsl:value-of select="$data/notice/@to"/></p>
            <xsl:choose>
                <xsl:when test="$data/notice/@link_href != ''">
                    <a href="{$data/notice/@link_href}" class="ff_module-task-todo__link"><xsl:value-of select="$data/notice/htmlMessage"/></a>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="$data/notice/htmlMessage"/>
                </xsl:otherwise>
            </xsl:choose>
            <xsl:if test="$data/notice/@from">
                <span class="ff_module-task-todo__meta">Set by <xsl:value-of select="$data/notice/@from"/></span>
            </xsl:if>
        </dt>
        <dd class="ff_module-task-todo__item ff_module-task-todo__item--date">
            <xsl:choose>
                <xsl:when test="not($data/notice/@duedate = '') and not($data/notice/@fuzzy_date = '')">
                    <div>Due <xsl:value-of select="$data/notice/@fuzzy_date"/></div>
                    <time class="ff_util-prose__text--small-quiet"><xsl:value-of select="$data/notice/@duedate"/></time>
                </xsl:when>
                <xsl:when test="not($data/notice/@duedate = '')">
                    Due <time><xsl:value-of select="$data/notice/@duedate"/></time>
                </xsl:when>
                <xsl:otherwise>
                    <time><xsl:value-of select="$data/notice/@duedate"/></time>
                </xsl:otherwise>
            </xsl:choose>
        </dd>
        <xsl:if test="$data/notice/module">
            <dd class="ff_module-task-todo__item ff_module-task-todo__item--module">
                <xsl:copy-of select="$data/notice/module/node()"/>
            </dd>
        </xsl:if>
    </dl>
</xsl:template>
