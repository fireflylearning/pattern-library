<xsl:template name="ff_module-planner-grid-week__header">
    <xsl:param name="day" />
    <xsl:param name="date" />
    <xsl:param name="nicedate" />
    <xsl:param name="weekstartday" />
    <xsl:param name="weekenddays" />
    <xsl:param name="dayIsToday" />

    <xsl:variable name="dayTypeClass">
        <xsl:if test="$dayIsToday">today</xsl:if>
        <xsl:if test="not($dayIsToday)">not-today</xsl:if>
    </xsl:variable>

    <!-- currently unused, although could be useful in the future -->
    <xsl:variable name="smartDayLabel">
        <xsl:choose>
            <xsl:when test="not($date = $nicedate)">
                <xsl:value-of select="$nicedate"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:value-of select="$day"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:choose>
        <xsl:when test="$day = $weekstartday">
            <th class="ff_module-planner-grid-week__header-col ff_module-planner-grid-week__header-col--empty"> </th>
            <th scope="col" class="ff_module-planner-grid-week__header-col ff_module-planner-grid-week__header-col--{$dayTypeClass}"><xsl:value-of select="$nicedate"/></th>
        </xsl:when>

        <xsl:when test="$day = $weekenddays/*"></xsl:when>

        <xsl:otherwise>
            <th scope="col" class="ff_module-planner-grid-week__header-col ff_module-planner-grid-week__header-col--{$dayTypeClass}"><xsl:value-of select="$nicedate"/></th>
        </xsl:otherwise>
    </xsl:choose>

</xsl:template>

<xsl:template name="ff_module-planner-grid-week">
    <xsl:param name="data" />

    <xsl:variable name="todayDate"><xsl:value-of select="$data//group/day[@nicedate = 'Today']/@dayofweek"/></xsl:variable>

    <div class="ff_module-planner-grid-week">
        <xsl:choose>
            <xsl:when test="not($data//event)">
                <div class="ff_module-planner-grid-week__no-events">
                    <p class="ff_module-planner-grid-week__no-events-message">Nothing in the timetable this week</p> 
                </div>
            </xsl:when>
            <xsl:otherwise>
                <table class="ff_module-planner-grid-week__content">
                    <thead>
                        <tr class="ff_module-planner-grid-week__row ff_module-planner-grid-week__row--header-col">
                            <xsl:for-each select="$data//group/day">
                                <xsl:call-template name="ff_module-planner-grid-week__header">
                                    <xsl:with-param name="day" select="@dayofweek"/>
                                    <xsl:with-param name="date" select="@date"/>
                                    <xsl:with-param name="nicedate" select="@nicedate"/> 
                                    <xsl:with-param name="weekstartday" select="$data//weekconfiguration/weekstartday"/>
                                    <xsl:with-param name="weekenddays" select="$data//weekconfiguration/weekenddays"/>
                                    <xsl:with-param name="dayIsToday" select="boolean(@dayofweek = $todayDate)"/>
                                </xsl:call-template>
                            </xsl:for-each>
                        </tr>
                    </thead>
                    <tbody>

                    <xsl:for-each select="$data//timeIndex/item">
                        <xsl:sort select="@minutestart"/>
                        <xsl:variable name="time" select="."/>
                        <xsl:variable name="rowIsEvent" select="not(@type = 'gapindex')"/>

                        <xsl:variable name="typeClass">
                            <xsl:if test="$rowIsEvent">timeindex</xsl:if>
                            <xsl:if test="not($rowIsEvent)">gap</xsl:if>
                        </xsl:variable>

                        <tr class="ff_module-planner-grid-week__row ff_module-planner-grid-week__row--{$typeClass}">

                            <th scope="row" class="ff_module-planner-grid-week__header-row ff_module-planner-grid-week__header-row--{$typeClass}">
                                <xsl:choose>
                                    <xsl:when test="$rowIsEvent">
                                    <time><xsl:value-of select="@name"/></time>
                                    </xsl:when>
                                    <xsl:otherwise>  </xsl:otherwise>
                                </xsl:choose>
                            </th>

                            <xsl:for-each select="$data//group/day[not(@dayofweek = $data//weekconfiguration/weekenddays/*)]">
                                <xsl:variable name="currentDay" select="@dayofweek"/>
                                <xsl:variable name="dayIsToday" select="boolean($currentDay = $todayDate)"/>

                                <xsl:variable name="event">
                                    <xsl:copy-of select="$data//group/day[@dayofweek = $currentDay]//event[@minutestart = $time/@minutestart]"/>
                                </xsl:variable>

                                <xsl:variable name="dayTypeClass">
                                    <xsl:if test="$dayIsToday">today</xsl:if>
                                    <xsl:if test="not($dayIsToday)">not-today</xsl:if>
                                </xsl:variable>

                                <td class="ff_module-planner-grid-week__item ff_module-planner-grid-week__item--{$dayTypeClass}">
                                    <xsl:if test="ext:node-set($event)/event">
                                        <xsl:call-template name="ff_module-class-view-week">
                                            <xsl:with-param name="data" select="ext:node-set($event)"/>
                                        </xsl:call-template>
                                    </xsl:if>
                                </td>

                            </xsl:for-each>
                        </tr>

                    </xsl:for-each>

                    </tbody>
                </table>
            </xsl:otherwise>
        </xsl:choose>
    </div>
</xsl:template>
