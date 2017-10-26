 <xsl:template name="ff_module-task">
    <xsl:param name="data" />

    <dl>
        <xsl:attribute name="class">
            <xsl:text>ff_module-task</xsl:text>
            <xsl:if test="$data/notice/@modifier">
                <xsl:text> ff_module-task--</xsl:text><xsl:value-of select="$data/notice/@modifier"/>
            </xsl:if>
            <xsl:if test="$data//progress"> ff_module-task--with-progress-bar</xsl:if>
        </xsl:attribute>
        <xsl:attribute name="id">
            <xsl:if test="$data/notice/@id">
                <xsl:value-of select="$data/notice/@id"/>
            </xsl:if>
        </xsl:attribute>
        <xsl:if test="$data/notice/@has_checkbox">
            <dd class="ff_module-task__item ff_module-task__item--checkbox">
                <xsl:call-template name="ff_module-form-input">
                    <xsl:with-param name="data" select="$data"/>
                </xsl:call-template>
            </dd>
        </xsl:if>
        <dt class="ff_module-task__item ff_module-task__item--title">
            <p class="ff_module-task__to"><xsl:value-of select="$data/notice/@to"/></p>
            <a href="{$data/notice/@link_href}" class="ff_module-task__link"><xsl:value-of select="$data/notice/htmlMessage"/></a>
            <xsl:if test="$data/notice/@from">
                <span class="ff_module-task__meta">Set by <xsl:value-of select="$data/notice/@from"/></span>
            </xsl:if>
            <xsl:if test="$data/notice/@unread_responses">
                <span class="ff_module-count-indicator ff_module-count-indicator--top-right">
                    <xsl:attribute name="title">
                        <xsl:value-of select="concat('You have ', $data/notice/@unread_responses, ' unread responses')" />
                    </xsl:attribute>
                    <xsl:value-of select="$data/notice/@unread_responses"/>
                </span>
            </xsl:if>
        </dt>
        <dd class="ff_module-task__item ff_module-task__item--date">
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
        <xsl:if test="$data//progress">
          <dd class="ff_module-task__item ff_module-task__item--progress">
              <xsl:call-template name="ff_module-progress">
                  <xsl:with-param name="data" select="ext:node-set($data)"/>
              </xsl:call-template>
          </dd>
        </xsl:if>
    </dl>
</xsl:template>
