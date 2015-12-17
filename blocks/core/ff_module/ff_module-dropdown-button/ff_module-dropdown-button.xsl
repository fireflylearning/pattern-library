<xsl:template name="ff_module-dropdown-button">
    <xsl:param name="data" />

    <xsl:apply-templates select="$data/dropdown-button" mode="ff_module-dropdown-button"/>

</xsl:template>

<xsl:template match="dropdown-button" mode="ff_module-dropdown-button">

    <div class="ff_module-dropdown-button ff_module-dropdown-button--{@modifier} {@classes}">
        <xsl:if test="boolean(@id)">
            <xsl:attribute name="data-ff-dropdown-target">
                <xsl:value-of select="@id"/>
            </xsl:attribute>
        </xsl:if>

        <button type="button" class="ff_module-dropdown-button__button ff_module-dropdown-button__button--{@modifier}">
            <xsl:if test="boolean(@id)">
                <xsl:attribute name="id">
                    <xsl:value-of select="@id"/>
                </xsl:attribute>
                <xsl:attribute name="data-ff-dropdown-trigger">
                    <xsl:value-of select="@id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:apply-templates select="text" mode="ff_module-dropdown-button"/>
        </button>
        <xsl:apply-templates select="list" mode="ff_module-dropdown-button"/>
    </div>
</xsl:template>


<xsl:template match="text" mode="ff_module-dropdown-button">
    <span class="ff_module-dropdown-button__content"><xsl:value-of select="." /></span>
    <span class="ff_module-dropdown-button__icon ff_module-dropdown-button__icon--{../@modifier}" >
        <xsl:if test="boolean(../@id)">
            <xsl:attribute name="data-ff-dropdown-target">
                <xsl:value-of select="../@id"/>
            </xsl:attribute>
        </xsl:if>
    </span>
</xsl:template>


<xsl:template match="list" mode="ff_module-dropdown-button">
    <div class="ff_module-dropdown-button__list-container ff_module-dropdown-button__list-container--{../@modifier}">
        <xsl:if test="boolean(../@id)">
            <xsl:attribute name="data-ff-dropdown-target">
                <xsl:value-of select="../@id"/>
            </xsl:attribute>
        </xsl:if>
        <ul class="ff_module-dropdown-button__list">
            <xsl:for-each select="item">
                <li><a href="{@href}" class="ff_module-dropdown-button__link"><xsl:value-of select="." /></a></li>
            </xsl:for-each>
        </ul>
    </div>
</xsl:template>
