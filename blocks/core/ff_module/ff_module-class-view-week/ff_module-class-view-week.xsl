<xsl:template name="ff_module-class-view-week">
    <xsl:param name="data" />
    <!-- style="border-left-color:{$data/event/@colour}" -->
    <div class="ff_module-class-view-week">
        <div class="ff_module-class-view-week__content" style="border-left-color:{$data/event/@colour}">
            <xsl:call-template name="ff_module-class-meta-week">
                <xsl:with-param name="data" select="$data"/>
            </xsl:call-template>
        </div>
    </div>
</xsl:template>
