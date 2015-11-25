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
        <span class="ff_module-date-picker-button__icon ff_icon ff_icon-cal"></span>
    </button>
</xsl:template>
