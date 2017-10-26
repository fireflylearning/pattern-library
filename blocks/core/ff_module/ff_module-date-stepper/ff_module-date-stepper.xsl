<xsl:template name="ff_module-date-stepper">
    <xsl:param name="data" />
    <div class="ff_module-date-stepper">
        <a class="ff_module-date-stepper__link ff_module-date-stepper__link--prev" href="{$data//planner/@previousUrl}"><span class="ff_icon ff_module-date-stepper__icon--prev"></span><span class="ff_util-icon-text">Previous</span></a>
        <h3 class="ff_module-date-stepper__title">
          <span class="ff_module-date-stepper__title--type">
            <xsl:value-of select="$data//planner/@titleType"/>
          </span> <span class="ff_module-date-stepper__title--date">
            <xsl:value-of select="$data//planner/@titleDate"/>
          </span>
        </h3>
        <a class="ff_module-date-stepper__link ff_module-date-stepper__link--next" href="{$data//planner/@nextUrl}"><span class="ff_icon ff_module-date-stepper__icon--next"></span><span class="ff_util-icon-text">Next</span></a>
    </div>
</xsl:template>
