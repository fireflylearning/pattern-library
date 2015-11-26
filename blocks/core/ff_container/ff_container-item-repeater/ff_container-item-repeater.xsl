<xsl:template name="ff_container-item-repeater">
	<xsl:param name="data" />

	<div class="ff_container-item-repeater">
		<ol class="ff_container-item-repeater__items">
			<xsl:for-each select="$data/items/item">
				<li class="ff_container-item-repeater__item">
					<xsl:value-of select="."/>
				</li>
			</xsl:for-each>
		</ol>
	</div>

</xsl:template>