<xsl:template name="ff_module-planner-class-meta">
    <xsl:param name="data" />
    <!-- style="border-left-color:{$data/event/@colour}" -->
    <ul class="ff_module-planner-class-meta">
        <li class="ff_module-planner-class-meta__item ff_module-planner-class-meta__id"><a class="ff_module-planner-class-meta__link" href="{$data/event/@url}"><xsl:value-of select="$data/event/@description"/></a></li>
        <li class="ff_module-planner-class-meta__item ff_module-planner-class-meta__name"><xsl:value-of select="$data/event/@subject"/></li>
        <li class="ff_module-planner-class-meta__item ff_module-planner-class-meta__room"><xsl:value-of select="$data/event/@location"/></li>
    </ul>

</xsl:template>
