<xsl:template name="ff_module-form-input">
    <xsl:param name="data" />
    <xsl:variable name="input" select="$data//input"/>
    <xsl:variable name="input-node" select="ext:node-set($input)" />
    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($input/@modifier = '')">
                <xsl:value-of select="$input/@modifier" />
            </xsl:when>
            <xsl:otherwise></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="className">
        <xsl:choose>
            <xsl:when test="not($modifier = '')"><xsl:text>ff_module-form-input ff_module-form-input--</xsl:text><xsl:value-of select="$modifier" /></xsl:when>
            <xsl:otherwise><xsl:text>ff_module-form-input</xsl:text></xsl:otherwise>
        </xsl:choose>
    </xsl:variable>
    <xsl:variable name="type">
        <xsl:choose>
            <xsl:when test="not($input/@type='')">
                <xsl:value-of select="$input/@type"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:text>text</xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:choose>
        <xsl:when test="$type='select'">
            <xsl:call-template name="ff_module-form-input__select">
                <xsl:with-param name="input" select="$input-node"/>
                <xsl:with-param name="className" select="$className"/>
                <xsl:with-param name="type" select="$type"/>
            </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
            <xsl:call-template name="ff_module-form-input__input">
                <xsl:with-param name="input" select="$input-node"/>
                <xsl:with-param name="className" select="$className"/>
                <xsl:with-param name="type"><xsl:value-of select="$type"/></xsl:with-param>
            </xsl:call-template>
        </xsl:otherwise>
    </xsl:choose>
</xsl:template>

<xsl:template name="ff_module-form-input__input">
    <xsl:param name="input" />
    <xsl:param name="className" />
    <xsl:param name="type" />

    <input class="{$className} {$input/@classes}">

        <xsl:attribute name="type">
            <xsl:value-of select="$type"/>
        </xsl:attribute>

        <xsl:if test="not($input/@id='')">
            <xsl:attribute name="id">
               <xsl:value-of select="$input/@id"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="not($input/@name='')">
            <xsl:attribute name="name">
               <xsl:value-of select="$input/@name"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="not($input/@value='')">
            <xsl:attribute name="value">
               <xsl:value-of select="$input/@value"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="$input/@type='radio' or $input/@type='checkbox'">
            <xsl:if test="$input/@checked='true'">
                <xsl:attribute name="checked">
                   <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
            <xsl:if test="$input/@disabled='true'">
                <xsl:attribute name="disabled">
                   <xsl:text>true</xsl:text>
                </xsl:attribute>
            </xsl:if>
        </xsl:if>

        <xsl:if test="$input/data">
            <xsl:for-each select="$input/data">
                <xsl:attribute name="{./@attr}">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </xsl:for-each>
        </xsl:if>

    </input>
</xsl:template>

<xsl:template name="ff_module-form-input__select">
    <xsl:param name="input" />
    <xsl:param name="className" />
    <xsl:param name="type" />

    <select class="{$className} {$input/@classes}">
        <xsl:if test="not($input/@id='')">
            <xsl:attribute name="id">
               <xsl:value-of select="$input/@id"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="not($input/@name='')">
            <xsl:attribute name="name">
               <xsl:value-of select="$input/@name"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="$input/data">
            <xsl:for-each select="$input/data">
                <xsl:attribute name="{./@attr}">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </xsl:for-each>
        </xsl:if>

        <xsl:for-each select="$input//option">
            <option class="ff_module-form-input__option" value="{./@value}"><xsl:value-of select="."/></option>
        </xsl:for-each>

    </select>
</xsl:template>
