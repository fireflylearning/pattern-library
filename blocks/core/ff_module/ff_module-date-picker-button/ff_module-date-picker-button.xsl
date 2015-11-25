<xsl:template name="ff_module-date-picker-button">
    <xsl:param name="data" />
    <button class="ff_module-date-picker-button">
        <span class="ff_module-date-picker-button__text">
            <xsl:choose>
                <xsl:when test="$data//planner/@type = 'day'">
                    Today
                </xsl:when>
                <xsl:when test="$data//planner/@type = 'week'">
                    This week
                </xsl:when>
            </xsl:choose>
        </span>
        <div class="ff_module-date-picker-button__icon">
            <span class="ff_icon ff_icon-cal"></span>
            <input class="ff_module-date-picker-button__cal" data-component="date-picker"/>
        </div>
    </button>
</xsl:template>
