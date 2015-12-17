<xsl:template name="ff_module-recipient-button-list">
	<xsl:param name="data" />
	<ul class="ff_module-recipient-button-list">
        <xsl:for-each select="$data//page">
        <xsl:variable name="page">
            <xsl:copy-of select="." />
        </xsl:variable>
		<li class="ff_module-recipient-button-list__item">
            <xsl:call-template name="ff_module-profile-picture-and-name-button">
                <xsl:with-param name="data" select="ext:node-set($page)" />
            </xsl:call-template>
        </li>
        </xsl:for-each>
	</ul>
</xsl:template>
