<xsl:template name="ff_module-dropdown-button">
    <xsl:param name="data" />
    <xsl:variable name="root" select="$data/dropdown-button" />
    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($data/dropdown-button/@modifier)"></xsl:when>
            <xsl:otherwise>--<xsl:value-of select="$data/dropdown-button/@modifier"/></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="classes"><xsl:value-of select="$root/@classes"/></xsl:variable>

    <div class="ff_module-dropdown-button ff_module-dropdown-button{$modifier} {$classes}">
        <button type="button" class="ff_module-dropdown-button__button ff_module-dropdown-button__button{$modifier}">
            <xsl:if test="$root/@id">
                <xsl:attribute name="id">
                    <xsl:value-of select="$root/@id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="$data/dropdown-button/text" mode="ff_module-dropdown-button"/>
        </button>
        <xsl:apply-templates select="$data/dropdown-button/list" mode="ff_module-dropdown-button"/>

    </div>
</xsl:template>

<xsl:template match="text[not(ancestor::dropdown-button[1]/@modifier)]" mode="ff_module-dropdown-button">
    <span class="ff_module-dropdown-button__content"><xsl:value-of select="." /></span>
</xsl:template>

<xsl:template match="text[boolean(ancestor::dropdown-button[1]/@modifier)]" mode="ff_module-dropdown-button">
    <span class="ff_module-dropdown-button__content ff_module-dropdown-button__content--{../@modifier}"><xsl:value-of select="." /></span>
    <span class="ff_module-dropdown-button__icon ff_module-dropdown-button__icon--{../@modifier}" />
</xsl:template>

<xsl:template match="list[not(ancestor::dropdown-button[1]/@modifier)]" mode="ff_module-dropdown-button">
    <div class="ff_module-dropdown-button__dropdown-container">
        <ul class="ff_module-dropdown-button__dropdown">
            <xsl:for-each select="item">
                <li><a href="{@href}" class="ff_module-dropdown-button__link"><xsl:value-of select="." /></a></li>
            </xsl:for-each>
        </ul>
    </div>
</xsl:template>

<xsl:template match="list[boolean(ancestor::dropdown-button[1]/@modifier)]" mode="ff_module-dropdown-button">
    <div class="ff_module-dropdown-button__dropdown-container ff_module-dropdown-button__dropdown-container--{../@modifier}">
        <ul class="ff_module-dropdown-button__dropdown ff_module-dropdown-button__dropdown--{../@modifier}">
            <xsl:for-each select="item">
                <li><a href="{@href}" class="ff_module-dropdown-button__link ff_module-dropdown-button__link--{../@modifier}"><xsl:value-of select="." /></a></li>
            </xsl:for-each>
        </ul>
    </div>
</xsl:template>
