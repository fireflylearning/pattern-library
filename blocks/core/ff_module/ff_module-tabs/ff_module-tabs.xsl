<xsl:template name="ff_module-tabs">
	<xsl:param name="data" />
	<div class="ff_module-tabs">
		<ul class="ff_module-tabs__navigation">
			<xsl:for-each select="$data/items/item">
				<li>
					<xsl:attribute name="class">
						<xsl:choose>
							<xsl:when test="active='true'">ff_module-tabs__tab ff_module-tabs__tab--active</xsl:when>
							<xsl:otherwise>ff_module-tabs__tab</xsl:otherwise>
						</xsl:choose>
					</xsl:attribute>		
					<a class="ff_module-tabs__link" href="#{id}"><xsl:value-of select="label"/></a>
				</li>
			</xsl:for-each>
		</ul>
	</div>
</xsl:template>
