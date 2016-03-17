<xsl:template name="ff_module-dropdown-button">
    <xsl:param name="data" />

    <xsl:apply-templates select="$data/dropdown-button" mode="ff_module-dropdown-button"/>

</xsl:template>

<xsl:template name="ff_module-dropdown-button-format-suffix">
    <xsl:param name="prefix"/>
    <xsl:param name="suffix"/>
    <xsl:choose>
        <xsl:when test="not($suffix = '')">
            <xsl:value-of select="$prefix"/>--<xsl:value-of select="$suffix"/>
        </xsl:when>
        <xsl:otherwise></xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template match="dropdown-button" mode="ff_module-dropdown-button">

    <xsl:variable name="rootmodifier">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="@modifier"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="rootstate">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="@state"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>

    <xsl:variable name="buttonmodifier">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button__button</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="@modifier"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="buttonstate">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button__button</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="@state"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>

    <!-- [<xsl:value-of select="$rootmodifier"/>:<xsl:value-of select="$rootstate"/>] -->

    <div class="ff_module-dropdown-button {$rootmodifier} {$rootstate} {@classes}">
        <xsl:if test="boolean(@id)">
            <xsl:attribute name="data-ff-dropdown-target">
                <xsl:value-of select="@id"/>
            </xsl:attribute>
        </xsl:if>

        <button type="button" class="ff_module-dropdown-button__button {$buttonmodifier} {$buttonstate} ">
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

    <xsl:variable name="modifier">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button__icon</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="../@modifier"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="state">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button__icon</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="../@state"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>

    <span class="ff_module-dropdown-button__content"><xsl:value-of select="." /></span>
    <span class="ff_module-dropdown-button__icon {$modifier} {$state}" >
        <xsl:if test="boolean(../@id)">
            <xsl:attribute name="data-ff-dropdown-target">
                <xsl:value-of select="../@id"/>
            </xsl:attribute>
        </xsl:if>
    </span>
</xsl:template>


<xsl:template match="list" mode="ff_module-dropdown-button">
    <xsl:variable name="modifier">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button__list-container</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="../@modifier"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>
    <xsl:variable name="state">
        <xsl:call-template name="ff_module-dropdown-button-format-suffix">
            <xsl:with-param name="prefix">ff_module-dropdown-button__list-container</xsl:with-param>
            <xsl:with-param name="suffix"><xsl:value-of select="../@state"/></xsl:with-param>
        </xsl:call-template>
    </xsl:variable>

    <div class="ff_module-dropdown-button__list-container {$modifier} {$state}">
        <xsl:if test="boolean(../@id)">
            <xsl:attribute name="data-ff-dropdown-target">
                <xsl:value-of select="../@id"/>
            </xsl:attribute>
        </xsl:if>
        <ul class="ff_module-dropdown-button__list">
            <xsl:apply-templates select="item" mode="ff_module-dropdown-button"/>
        </ul>
    </div>
</xsl:template>


<xsl:template match="item[@href]" mode="ff_module-dropdown-button">
    <li class="ff_module-dropdown-button__list-item"><a href="{@href}" class="ff_module-dropdown-button__link"><xsl:value-of select="." /></a></li>
</xsl:template>

<xsl:template match="item[not(@href)]" mode="ff_module-dropdown-button">
    <xsl:variable name="button">
        <button modifier="link" classes="ff_module-dropdown-button__link-button">
            <text><xsl:value-of select="." /></text>
            <xsl:if test="boolean(@attr)">
                <data attr="data-ff_module-dropdown-button__link-button"><xsl:value-of select="@attr" /></data>
            </xsl:if>
        </button>
    </xsl:variable>
    <li class="ff_module-dropdown-button__list-item">
        <xsl:call-template name="ff_module-button" >
            <xsl:with-param name="data" select="ext:node-set($button)"/>
        </xsl:call-template>
    </li>
</xsl:template>
