<xsl:template name="ff_module-date-stepper">
    <xsl:param name="data" />
    <div class="ff_module-date-stepper">
        <a class="ff_module-date-stepper__link ff_module-date-stepper__link--prev" href="{$data//planner/@previousUrl}"><span class="ff_icon ff_icon-prev"></span><span class="ff_util-icon-text">Previous</span></a>
        <h3 class="ff_module-date-stepper__title">
            <xsl:choose>
                <xsl:when test="$data//planner/@type = 'day'">
                    <span class="ff_module-date-stepper__title--type">Today</span>
                </xsl:when>
                <xsl:when test="$data//planner/@type = 'week'">
                    <span class="ff_module-date-stepper__title--type">Week</span>
                </xsl:when>
            </xsl:choose>
            <span class="ff_module-date-stepper__title--date"><xsl:value-of select="$data//planner/@date"/></span>
        </h3>
        <a class="ff_module-date-stepper__link ff_module-date-stepper__link--next" href="{$data//planner/@nextUrl}"><span class="ff_icon ff_icon-prev"></span><span class="ff_util-icon-text">Next</span></a>
    </div>
</xsl:template>
