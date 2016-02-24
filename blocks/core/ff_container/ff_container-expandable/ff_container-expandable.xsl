<xsl:template name="ff_container-expandable">
	<xsl:param name="data" />
	<div class="ff_container-expandable">
		<div class="ff_container-expandable__dropdown ff_container-expandable__dropdown--small-screens" data-ff-action="expandable">
			<xsl:attribute name="class">
				<xsl:text>ff_container-expandable__dropdown</xsl:text>
				<xsl:if test="$data/expandable/@modifier">
					<xsl:text> ff_module-expandable__dropdown--</xsl:text><xsl:value-of select="$data/expandable/@modifier"/>
				</xsl:if>
			</xsl:attribute>
			<span data-ff="expandable-text" data-open-text="{$data/expandable/@open-text}" data-closed-text="{$data/expandable/@closed-text}">
				<xsl:value-of select="$data/expandable/@open-text" />
			</span>
			<span data-icon="expandable-icon" class="ff_icon ff_container-expandable__icon ff_icon-page-up-open-blue"></span>
		</div>
		<div class="ff_container-expandable__content" data-ff="expandable-content">
			<xsl:value-of select="$data/expandable/content" />
		</div>
	</div>
</xsl:template>