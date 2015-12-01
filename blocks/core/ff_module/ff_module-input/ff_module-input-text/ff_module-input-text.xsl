<xsl:template name="ff_module-input-text">
    <xsl:param name="data" />
    <xsl:variable name="input" select="$data//input"/>
    <xsl:variable name="label-modifier">
        <xsl:choose>
            <xsl:when test="not($input/@modifier = '')">
                ff_module-input-text__label--<xsl:value-of select="$input/@modifier" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:variable name="input-modifier">
        <xsl:choose>
            <xsl:when test="not($input/@modifier = '')">
                ff_module-input-text__input--<xsl:value-of select="$input/@modifier" />
            </xsl:when>
            <xsl:otherwise>
                <xsl:text></xsl:text>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="ff_module-input-text">
        <label class="ff_module-input-text__label {$label-modifier}">
            <xsl:attribute name="for">
               <xsl:choose>
                   <xsl:when test="not($input/@id='')"><xsl:value-of select="$input/@id"/></xsl:when>
               </xsl:choose>
            </xsl:attribute>
            <xsl:value-of select="$input" />
        </label>
        <input type="text" class="ff_module-input-text__input {$input-modifier}">
            <xsl:attribute name="id">
               <xsl:choose>
                   <xsl:when test="not($input/@id='')"><xsl:value-of select="$input/@id"/></xsl:when>
               </xsl:choose>
            </xsl:attribute>
        </input>
    </div>
</xsl:template>
