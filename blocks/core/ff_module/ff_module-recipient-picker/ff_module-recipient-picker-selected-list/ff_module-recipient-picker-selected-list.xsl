<xsl:template name="ff_module-recipient-picker-selected-list">
	<xsl:param name="data" />
	<ul class="ff_module-recipient-picker-selected-list">
        <xsl:value-of select="$data" disable-output-escaping="yes" />
        <xsl:for-each select="$data//page">

        <xsl:variable name="page">
            <xsl:copy-of select="." />
        </xsl:variable>
		<li class="ff_module-recipient-picker-selected-list__item">
            <xsl:call-template name="ff_module-form-box-member">
                <xsl:with-param name="data" select="ext:node-set($page)" />
            </xsl:call-template>
        </li>
        </xsl:for-each>
	</ul>
</xsl:template>
