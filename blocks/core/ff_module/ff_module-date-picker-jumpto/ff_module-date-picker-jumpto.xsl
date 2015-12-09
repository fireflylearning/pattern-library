<xsl:template name="ff_module-date-picker-jumpto">
    <xsl:param name="data" />
    
    <div class="ff_module-date-picker-jumpto">
        <a href="{$data//planner/@nowUrl}" class="ff_module-date-picker-jumpto__link">
           <xsl:choose>
                <xsl:when test="$data//planner/@type = 'day'">Today</xsl:when>
                <xsl:when test="$data//planner/@type = 'week'">This week</xsl:when>
            </xsl:choose> 
        </a>
        <div class="ff_module-date-picker-jumpto__icon">
            <span class="ff_icon ff_icon-cal ff_module-date-picker-jumpto__trigger">
                <input class="ff_module-date-picker-jumpto__cal" data-ff="date-picker" data-ff-url-prefix="{$data//planner/@dateUrlPrefix}"/>
            </span>   
        </div>
    </div>
</xsl:template>
