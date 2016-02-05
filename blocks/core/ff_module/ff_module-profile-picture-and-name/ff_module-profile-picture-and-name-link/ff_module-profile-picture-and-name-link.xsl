<xsl:template name="ff_module-profile-picture-and-name-link">
	<xsl:param name="data" />
    <xsl:variable name="page" select="$data/page"/>
	<div class="ff_module-profile-picture-and-name-link">
		<figure class="ff_module-profile-picture-and-name-link__picture">
			<img class="ff_module-profile-picture-and-name-link__image" src="{$page/@pic_href}"/>
		</figure>
		<a class="ff_module-profile-picture-and-name-link__title" href="{$page/@href}"><xsl:value-of select="$page/@title"/></a>
	</div>
</xsl:template>
