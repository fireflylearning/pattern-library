<xsl:template name="ff_module-planner-date-picker-jumpto">
    <xsl:param name="data" />
    
    <div class="ff_module-planner-date-picker-jumpto">
        <a href="{$data//planner/@nowUrl}" class="ff_module-date-picker-jumpto__link">
           <xsl:choose>
                <xsl:when test="$data//planner/@type = 'day'">Today</xsl:when>
                <xsl:when test="$data//planner/@type = 'week'">This week</xsl:when>
            </xsl:choose>
        </a>
		
		<xsl:variable name="date-picker">
			<date-picker dateUrlPrefix="{$data//planner/@dateUrlPrefix}" />
		</xsl:variable>
		<xsl:call-template name="ff_module-date-picker-jumpto">
			<xsl:with-param name="data" select="ext:node-set($date-picker)"/>
		</xsl:call-template>
    </div>
</xsl:template>
