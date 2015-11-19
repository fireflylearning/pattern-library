<xsl:template name="ff_module-class-meta-week">
    <xsl:param name="data" />
    <ul class="ff_module-class-meta-week">
        <li class="ff_module-class-meta-week__item ff_module-class-meta-week__item--time">
        <xsl:call-template name="formateTimeRange">
            <xsl:with-param name="startdate" select="$data/event/@isostartdate" />
            <xsl:with-param name="enddate" select="$data/event/@isoenddate" />
        </xsl:call-template>
        </li>
        <li class="ff_module-class-meta-week__item ff_module-class-meta-week__item--desc"><a class="ff_module-class-meta-week__link" href="{$data/event/@url}"><xsl:value-of select="$data/event/@description"/></a></li>
        <li class="ff_module-class-meta-week__item ff_module-class-meta-week__item--subject"><xsl:value-of select="$data/event/@subject"/></li>
        <li class="ff_module-class-meta-week__item ff_module-class-meta-week__item--loc"><xsl:value-of select="$data/event/@location"/></li>
    </ul>
</xsl:template>


<xsl:template name="formatTime">
    <xsl:param name="dateTime" />
    <xsl:variable name="time" select="substring-after($dateTime,'T')" />
    <xsl:variable name="hh" select="substring($time,1,2)" />
    <xsl:variable name="mm" select="substring($time,4,2)" />
    <xsl:variable name="ss" select="substring($time,7,2)" />
    <xsl:value-of select="$hh"/><xsl:value-of select="':'"/><xsl:value-of select="$mm"/>
</xsl:template>

<xsl:template name="formateTimeRange">
    <xsl:param name="startdate"/>
    <xsl:param name="enddate"/>
    <xsl:call-template name="formatTime">
        <xsl:with-param name="dateTime" select="$startdate" />
    </xsl:call-template>
    <xsl:value-of select="'-'"/>
    <xsl:call-template name="formatTime">
        <xsl:with-param name="dateTime" select="$enddate" />
    </xsl:call-template>
</xsl:template>
