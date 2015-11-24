<xsl:template name="ff_module-planner-grid-week">
    <xsl:param name="data" />

    <div class="ff_module-planner-grid-week">
        <table class="ff_module-planner-grid-week__content">

            <tbody>
            <xsl:for-each select="$data//event">
                <xsl:sort select="@isostartdate"/>

                <xsl:variable name="event">
                    <xsl:copy-of select="."/>
                </xsl:variable>

                <tr class="ff_module-planner-grid-week__row">

                    <th scope="row" class="ff_module-planner-grid-week__header">
                        <xsl:call-template name="formateTimeRange-wk">
                            <xsl:with-param name="startdate" select="@isostartdate" />
                            <xsl:with-param name="enddate" select="@isoenddate" />
                        </xsl:call-template>
                    </th>

                    <xsl:if test="@subject != ''">
                    <td class="ff_module-planner-grid-week__item ff_module-planner-grid-week__item--event">
                        <xsl:call-template name="ff_module-class-view-week">
                            <xsl:with-param name="data" select="$event"/>
                        </xsl:call-template>
                    </td>
                    <td class="ff_module-planner-grid-week__item ff_module-planner-grid-week__item--note">
                        <xsl:call-template name="ff_module-planner-note">
                            <xsl:with-param name="data" select="$event"/>
                        </xsl:call-template>
                    </td>
                    </xsl:if>

                    <xsl:if test="not(@subject != '')">
                        <td class="ff_module-planner-grid-week__item ff_module-planner-grid-week__item--empty" colspan="2">No lesson in timetable</td>
                    </xsl:if>
                </tr>
            </xsl:for-each>
            </tbody>
        </table>
    </div>
</xsl:template>
