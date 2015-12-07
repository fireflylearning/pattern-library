<xsl:template name="ff_module-recipient-list">
	<xsl:param name="data" />
	<ul class="ff_module-recipient-list">
        <xsl:for-each select="$data//recipient">
		<li class="ff_module-recipient-list__item">
            <xsl:call-template name="ff_module-profile-picture-and-name">
                <xsl:with-param name="data" select="." />
            </xsl:call-template>
        </li>
        </xsl:for-each>
	</ul>
</xsl:template>
