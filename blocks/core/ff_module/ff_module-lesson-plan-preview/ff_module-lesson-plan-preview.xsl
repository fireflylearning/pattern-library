<xsl:template name="ff_module-lesson-plan-preview">
	<xsl:param name="data" />

	<div class="ff_module-lesson-plan-preview">
    <p class="ff_module-lesson-plan-preview__event">
      <a href="{$data/event/@url}" class="ff_module-lesson-plan-preview__link">
        <xsl:value-of select="$data/event/@start-date-display"/>
        <xsl:text> </xsl:text>
        <xsl:value-of select="$data/event/@starttime"/>
      </a>
      <span class="ff_module-lesson-plan-preview__location">
        <xsl:value-of select="$data/event/@location"/>
      </span>
    </p>
    <div class="ff_module-lesson-plan-preview__note">
      <xsl:value-of select="$data/event/note" disable-output-escaping="yes"/>
    </div>
	</div>

</xsl:template>
