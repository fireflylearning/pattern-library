<xsl:template name="ff_module-progress">
    <xsl:param name="data" />

    <xsl:variable name="completed">
        <xsl:value-of select="format-number(($data/progress/@completed_by div $data/progress/@sent_to) * 100, '#')"/><xsl:text>%</xsl:text>
    </xsl:variable>
    <xsl:variable name="marked">
        <xsl:value-of select="format-number(($data/progress/@marked div $data/progress/@sent_to) * 100, '#')"/><xsl:text>%</xsl:text>
    </xsl:variable>
    <xsl:variable name="marked-diff">
       <xsl:value-of select="format-number((($data/progress/@completed_by - $data/progress/@marked) div $data/progress/@sent_to) * 100, '#')"/><xsl:text>%</xsl:text>
    </xsl:variable>
    <xsl:variable name="completed_is_lonely">
        <xsl:if test="$data/progress/@marked = 0">ff_module-progress__bar--lonely</xsl:if>
    </xsl:variable>
    <xsl:variable name="marked_is_lonely">
        <xsl:if test="$data/progress/@marked = $data/progress/@completed_by or $data/progress/@completed_by = 0 ">ff_module-progress__bar--lonely</xsl:if>
    </xsl:variable>

    <div class="ff_module-progress {$data/progress/@classes}">
        <div class="ff_module-progress__stacked">
            <div class="ff_module-progress__bar ff_module-progress__bar--marked {$marked_is_lonely}" style="width: {$marked};" title="{$marked} Marked">
                <span class="ff_module-progress__meta"><xsl:value-of select="$marked"/> Marked</span>
            </div>
            <div class="ff_module-progress__bar ff_module-progress__bar--completed {$completed_is_lonely}" style="width: {$marked-diff};" title="{$completed} Completed">
                <span class="ff_module-progress__meta"><xsl:value-of select="$completed"/> Completed</span>
            </div>
        </div>
        <ul class="ff_module-progress__key">
            <li class="ff_module-progress__label ff_module-progress__label--marked"><span class="ff_module-progress__label-value"><xsl:value-of select="$data/progress/@marked"/></span> Marked</li>
            <li class="ff_module-progress__label ff_module-progress__label--completed"><span class="ff_module-progress__label-value"><xsl:value-of select="$data/progress/@completed_by"/></span> Completed</li>
            <li class="ff_module-progress__label ff_module-progress__label--total"><span class="ff_module-progress__label-value"><xsl:value-of select="$data/progress/@sent_to"/></span> Total</li>
        </ul>
    </div>

</xsl:template>
