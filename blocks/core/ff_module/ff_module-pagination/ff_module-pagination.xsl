<xsl:template name="ff_module-pagination">
	<xsl:param name="data" />
	<div class="ff_module-pagination">
		<ul class="ff_module-pagination__items">
			<xsl:variable name="pages_count" select="count($data/pages/page)" />

			<xsl:if test="not($data/pages/page[@selected='true']/@label = 1)">
				<xsl:apply-templates select="$data/pages/page[@selected='true']" mode="ff_module-pagination-previous" />
			</xsl:if>

			<xsl:for-each select="$data/pages/page">
				<xsl:variable name="is_current">
					<xsl:text>ff_module-pagination__link</xsl:text>
					<xsl:if test="@selected='true'"> ff_module-pagination__link--current</xsl:if>
				</xsl:variable>
				<li class="ff_module-pagination__item">
					<a href="{@href}" class="{$is_current}"><xsl:value-of select="@label"/></a>
				</li>
			</xsl:for-each>

			<xsl:if test="not($data/pages/page[@selected='true']/@label = $pages_count)">
				<xsl:apply-templates select="$data/pages/page[@selected='true']" mode="ff_module-pagination-following" />
			</xsl:if>

			
		</ul>
	</div>
</xsl:template>

<xsl:template match="*" mode="ff_module-pagination-previous">
	<li class="ff_module-pagination__item">
		<a href="{preceding-sibling::page[1]/@href}"><span class="ff_icon ff_module-pagination__icon--prev"></span></a>
	</li>
</xsl:template>

<xsl:template match="*" mode="ff_module-pagination-following">
	<li class="ff_module-pagination__item">
		<a href="{following-sibling::page[1]/@href}"><span class="ff_icon ff_module-pagination__icon--next"></span></a>
	</li>
</xsl:template>