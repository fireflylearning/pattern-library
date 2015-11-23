<xsl:template name="ff_module-planner-grid-day">
    <xsl:param name="data" />
    <div class="ff_module-planner-grid-day">
        <table class="ff_module-planner-grid-day__content">
            <xsl:for-each select="$data/events/event">
                <tr class="ff_module-planner-grid-day__row">
                    <td class="ff_module-planner-grid-day__item">
                        <xsl:call-template name="formateTimeRange-dy">
                            <xsl:with-param name="startdate" select="@isostartdate" />
                            <xsl:with-param name="enddate" select="@isoenddate" />
                        </xsl:call-template>
                    </td>
                    <td class="ff_module-planner-grid-day__item">
                        <xsl:call-template name="ff_module-class-view-day">
                            <xsl:with-param name="data" select="."/>
                        </xsl:call-template>
                    </td>
                    <td class="ff_module-planner-grid-day__item">
                        <xsl:call-template name="ff_module-planner-note">
                            <xsl:with-param name="data" select="."/>
                        </xsl:call-template>
                    </td>
                </tr>
            </xsl:for-each>
        </table>
    </div>
</xsl:template>

<xsl:template name="formatTime-dy">
    <xsl:param name="dateTime" />
    <xsl:variable name="time" select="substring-after($dateTime,'T')" />
    <xsl:variable name="hh" select="substring($time,1,2)" />
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
