<xsl:template name="ff_module-planner-grid-day">
    <xsl:param name="data" />

    <div class="ff_module-planner-grid-day">

        <xsl:attribute name="class">
            <xsl:text>ff_module-planner-grid-day</xsl:text>
            <xsl:if test="not($data//event)"> ff_module-planner-grid-day--no-events</xsl:if>
        </xsl:attribute>

        <xsl:choose>
            <xsl:when test="not($data//event)">
                <div class="ff_module-planner-grid-day__no-events">
                    <p class="ff_module-planner-grid-day__no-events-message">Nothing in the timetable today</p>
                </div>
            </xsl:when>

            <xsl:otherwise>
                <table class="ff_module-planner-grid-day__content">

                    <tbody>
                    <xsl:for-each select="$data//event">
                        <xsl:sort select="@isostartdate"/>

                        <xsl:variable name="event">
                            <xsl:copy-of select="."/>
                        </xsl:variable>

                        <tr class="ff_module-planner-grid-day__row" data-ff="planner-event" data-event-guid="{@guid}">

                            <th scope="row" class="ff_module-planner-grid-day__header">
                                <xsl:call-template name="formateTimeRange-dy">
                                    <xsl:with-param name="startdate" select="@isostartdate" />
                                    <xsl:with-param name="enddate" select="@isoenddate" />
                                </xsl:call-template>
                            </th>

                            <xsl:if test="@subject != ''">
                            <td class="ff_module-planner-grid-day__item ff_module-planner-grid-day__item--event ff_module-planner-grid-day__color--{@color}">
                                <xsl:call-template name="ff_module-class-meta-day">
                                    <xsl:with-param name="data" select="ext:node-set($event)"/>
                                </xsl:call-template>
                            </td>
                            <td class="ff_module-planner-grid-day__item ff_module-planner-grid-day__item--note">
                                <xsl:call-template name="ff_module-planner-note">
                                    <xsl:with-param name="data" select="ext:node-set($event)"/>
                                </xsl:call-template>
                            </td>
                            </xsl:if>

                            <xsl:if test="not(@subject != '')">
                                <td class="ff_module-planner-grid-day__item ff_module-planner-grid-day__item--empty"><span class="ff_util-prose__left-blank">No lesson in timetable</span></td>
                                <td class="ff_module-planner-grid-day__item ff_module-planner-grid-day__item--note"></td>
                            </xsl:if>
                        </tr>
                    </xsl:for-each>
                    </tbody>
                </table>
            </xsl:otherwise>
        </xsl:choose> 
    </div>
</xsl:template>

<xsl:template name="formatTime-dy">
    <xsl:param name="dateTime" />
    <xsl:variable name="time" select="substring-after($dateTime,'T')" />
    <xsl:variable name="hh" select="number(substring($time,1,2))" />
    <xsl:variable name="mm" select="substring($time,4,2)" />
    <xsl:variable name="ss" select="substring($time,7,2)" />
    <xsl:value-of select="$hh"/><xsl:value-of select="':'"/><xsl:value-of select="$mm"/>
</xsl:template>

<xsl:template name="formateTimeRange-dy">
    <xsl:param name="startdate"/>
    <xsl:param name="enddate"/>
    <xsl:call-template name="formatTime-dy">
        <xsl:with-param name="dateTime" select="$startdate" />
    </xsl:call-template>
    <xsl:value-of select="'-'"/>
    <xsl:call-template name="formatTime-dy">
        <xsl:with-param name="dateTime" select="$enddate" />
    </xsl:call-template>
</xsl:template>
