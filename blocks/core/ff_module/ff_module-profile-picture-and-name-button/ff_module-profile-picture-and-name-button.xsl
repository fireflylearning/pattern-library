<xsl:template name="ff_module-profile-picture-and-name-button">
	<xsl:param name="data" />
    <xsl:variable name="page" select="$data/page"/>
    <xsl:variable name="isSelected" select="boolean($page/@state='is-selected')" />
	<button type="button">
        <xsl:attribute name="class">
            <xsl:choose>
                <xsl:when test="boolean($isSelected)">ff_module-profile-picture-and-name-button ff_module-profile-picture-and-name-button--is-selected</xsl:when>
                <xsl:otherwise>ff_module-profile-picture-and-name-button</xsl:otherwise>
            </xsl:choose>
        </xsl:attribute>
        <xsl:if test="$page/@guid">
            <xsl:attribute name="data-ff-recipient-guid">
                <xsl:value-of select="$page/@guid"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:if test="boolean($isSelected)">
            <xsl:attribute name="disabled">true</xsl:attribute>
        </xsl:if>
		<figure class="ff_module-profile-picture-and-name-button__picture">
			<img class="ff_module-profile-picture-and-name-button__image" src="{$page/@pic_href}"/>
		</figure>
		<span class="ff_module-profile-picture-and-name-button__title" href="{$page/@href}"><xsl:value-of select="$page/@title"/></span>
	</button>
</xsl:template>
