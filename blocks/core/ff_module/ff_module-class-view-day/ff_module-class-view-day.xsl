<xsl:template name="ff_module-class-view-day">
    <xsl:param name="data" />
    <!-- style="border-left-color:{$data/event/@colour}" -->
    <div class="ff_module-class-view-day">
        <div class="ff_module-class-view-day__content" style="border-left-color:{$data/event/@colour}">
        <xsl:call-template name="ff_module-class-meta-day">
            <xsl:with-param name="data" select="$data"/>
        </xsl:call-template>
        </div>
    </div>
</xsl:template>
