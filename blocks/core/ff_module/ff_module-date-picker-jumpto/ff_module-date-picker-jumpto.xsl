<xsl:template name="ff_module-date-picker-jumpto">
    <xsl:param name="data" />
    
    <div class="ff_module-date-picker-jumpto">
        <div class="ff_module-date-picker-jumpto__icon">
            <span class="ff_icon ff_icon-calendar-blue ff_module-date-picker-jumpto__trigger">
				<xsl:apply-templates select="$data" mode="date-picker-input" />
            </span>   
        </div>
    </div>
</xsl:template>

<xsl:template match="*[string(@dateUrlPrefix)]" mode="date-picker-input">
    <input class="ff_module-date-picker-jumpto__cal" data-ff="date-picker" data-ff-url-prefix="{@dateUrlPrefix}"/>
</xsl:template>

<xsl:template match="*[string(@target-input-id)]" mode="date-picker-input">
    <input class="ff_module-date-picker-jumpto__cal" data-ff="date-picker" data-ff-target-input-id="{@target-input-id}"/>
</xsl:template>