<xsl:template name="ff_module-user">
	<xsl:param name="data" />
	<div class="ff_module-profile-picture-and-name">
		<figure class="ff_module-profile-picture-and-name__picture"><img src="{picture}"/></figure>
		<a class="ff_module-profile-picture-and-name__name" href="{profile_url}"><xsl:value-of select="name"/></a>
	</div>
</xsl:template>
