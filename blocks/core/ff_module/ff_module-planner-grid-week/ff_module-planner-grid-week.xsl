<xsl:template name="ff_module-planner-grid-week">
    <xsl:param name="data" />

    <div class="ff_module-planner-grid-week">
        <table class="ff_module-planner-grid-week__content">
            <thead>
                <tr class="ff_module-planner-grid-week__row">
                    <th class="ff_module-planner-grid-week__header"> </th>
                    <th class="ff_module-planner-grid-week__header">Monday</th>
                    <th class="ff_module-planner-grid-week__header">Tuesday</th>
                    <th class="ff_module-planner-grid-week__header">Wednesday</th>
                    <th class="ff_module-planner-grid-week__header">Thursday</th>
                    <th class="ff_module-planner-grid-week__header">Friday</th>
                </tr>
            </thead>
            <tbody>

            <xsl:for-each select="$data//time">
                <xsl:sort select="@start"/>
                <tr class="ff_module-planner-grid-week__row">
                    <th class="ff_module-planner-grid-week__header"><time><xsl:value-of select="@start"/></time>
                    <xsl:value-of select="'-'"/>
                    <time><xsl:value-of select="@end"/></time></th>
                    <td class="ff_module-planner-grid-week__item"> .</td>
                    <td class="ff_module-planner-grid-week__item"> .</td>
                    <td class="ff_module-planner-grid-week__item"> .</td>
                    <td class="ff_module-planner-grid-week__item">.</td>
                    <td class="ff_module-planner-grid-week__item">.</td>
                </tr>
            </xsl:for-each>

            <xsl:for-each select="$data//event">
                <xsl:sort select="@isostartdate"/>

                <xsl:variable name="event">
                    <xsl:copy-of select="."/>
                </xsl:variable>

                <!-- <xsl:call-template name="ff_module-class-view-week">
                            <xsl:with-param name="data" select="$event"/>
                        </xsl:call-template>
                </tr> -->
            </xsl:for-each>


            </tbody>
        </table>
    </div>
</xsl:template>
