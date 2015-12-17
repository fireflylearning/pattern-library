<xsl:template name="ff_module-recipient-link-list">
	<xsl:param name="data" />
	<ul class="ff_module-recipient-link-list">
        <xsl:for-each select="$data//page">
        <xsl:variable name="page">
            <xsl:copy-of select="." />
        </xsl:variable>
		<li class="ff_module-recipient-link-list__item">
            <xsl:call-template name="ff_module-profile-picture-and-name-link">
                <xsl:with-param name="data" select="ext:node-set($page)" />
            </xsl:call-template>
        </li>
        </xsl:for-each>
	</ul>
</xsl:template>
