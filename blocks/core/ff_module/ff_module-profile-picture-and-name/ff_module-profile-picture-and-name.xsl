<xsl:template name="ff_module-profile-picture-and-name">
	<xsl:param name="data" />
	<div class="ff_module-profile-picture-and-name">
		<figure class="ff_module-profile-picture-and-name__picture">
			<img class="ff_module-profile-picture-and-name__image" src="{picture}"/>
		</figure>
		<a class="ff_module-profile-picture-and-name__name" href="{url}"><xsl:value-of select="name"/></a>
	</div>
</xsl:template>
