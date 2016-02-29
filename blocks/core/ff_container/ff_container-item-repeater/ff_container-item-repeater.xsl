<xsl:template name="ff_container-item-repeater">
	<xsl:param name="data" />
    <xsl:variable name="item_class">
        <xsl:choose>
            <xsl:when test="boolean($data/items/@modifier)">ff_container-item-repeater__item ff_container-item-repeater__item--<xsl:value-of select="$data/items/@modifier"/></xsl:when>
            <xsl:otherwise>ff_container-item-repeater__item</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
	<div class="ff_container-item-repeater ff_container-item-repeater--{$data/items/@modifier}">
		<ol class="ff_container-item-repeater__items">
			<xsl:for-each select="$data/items/item">
				<li class="{$item_class}">
					<xsl:copy-of select="node()"/>
				</li>
			</xsl:for-each>
		</ol>
	</div>

</xsl:template>
