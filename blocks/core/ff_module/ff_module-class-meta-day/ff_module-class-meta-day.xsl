<xsl:template name="ff_module-class-meta-day">
    <xsl:param name="data" />
    <ul class="ff_module-class-meta-day">
        <li class="ff_module-class-meta-day__item ff_module-class-meta-day__item--desc"><a class="ff_module-class-meta-day__link" href="{$data/event/@url}"><xsl:value-of select="$data/event/@description"/></a></li>
        <li class="ff_module-class-meta-day__item ff_module-class-meta-day__item--subject" data-ff="planner-event-subject"><xsl:value-of select="$data/event/@subject"/></li>
        <li class="ff_module-class-meta-day__item ff_module-class-meta-day__item--loc"><xsl:value-of select="$data/event/@location"/></li>
    </ul>

</xsl:template>
