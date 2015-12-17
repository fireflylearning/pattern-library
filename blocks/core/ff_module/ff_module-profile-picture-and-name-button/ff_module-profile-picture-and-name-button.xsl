<xsl:template name="ff_module-profile-picture-and-name-button">
	<xsl:param name="data" />
    <xsl:variable name="page" select="$data/page"/>
	<button type="button" class="ff_module-profile-picture-and-name-button">
		<figure class="ff_module-profile-picture-and-name-button__picture">
			<img class="ff_module-profile-picture-and-name-button__image" src="{$page/@pic_href}"/>
		</figure>
		<span class="ff_module-profile-picture-and-name-button__title" href="{$page/@href}"><xsl:value-of select="$page/@title"/></span>
	</button>
</xsl:template>
