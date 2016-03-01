<xsl:template name="ff_container-expandable">
	<xsl:param name="data" />
	<div data-ff="expandable" class="ff_container-expandable">
		<xsl:attribute name="class">
			<xsl:text>ff_container-expandable</xsl:text>
			<xsl:if test="$data/expandable/@modifier">
				<xsl:text> ff_container-expandable--</xsl:text><xsl:value-of select="$data/expandable/@modifier"/>
			</xsl:if>
		</xsl:attribute>
		<div data-ff-action="expandable-dropdown" class="ff_container-expandable__header">
			<span data-ff="expandable-text" data-expanded-text="{$data/expandable/@expanded-text}" data-collapsed-text="{$data/expandable/@collapsed-text}">
				<xsl:value-of select="$data/expandable/@collapsed-text" />
			</span>
			<span data-icon="expandable-icon" data-collapsed-icon="{$data/expandable/@collapsed-icon}" data-expanded-icon="{$data/expandable/@expanded-icon}" class="ff_icon ff_container-expandable__icon {$data/expandable/@collapsed-icon}"></span>
		</div>
		<div class="ff_container-expandable__content" data-ff="expandable-content">
			<xsl:copy-of select="$data/expandable/content/node()"/>
		</div>
	</div>
</xsl:template>