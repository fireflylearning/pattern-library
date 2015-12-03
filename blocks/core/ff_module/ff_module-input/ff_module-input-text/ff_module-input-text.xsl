<xsl:template name="ff_module-input-text">
    <xsl:param name="data" />
    <xsl:variable name="input" select="$data//input"/>
    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($data//input/@modifier = '')">
                <xsl:value-of select="$data//input/@modifier" />
            </xsl:when>
            <xsl:otherwise>default</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="ff_module-input-text ff_module-input-text--{$modifier}">
        <label class="ff_module-input-text__label ff_module-input-text__label--{$modifier}">
            <xsl:attribute name="for">
               <xsl:choose>
                   <xsl:when test="not($input/@id='')"><xsl:value-of select="$input/@id"/></xsl:when>
               </xsl:choose>
            </xsl:attribute>
            <xsl:value-of select="$input" />
        </label>
        <input type="text" class="ff_module-input-text__input ff_module-input-text__input--{$modifier}">
            <xsl:attribute name="id">
               <xsl:choose>
                   <xsl:when test="not($input/@id='')"><xsl:value-of select="$input/@id"/></xsl:when>
               </xsl:choose>
            </xsl:attribute>
        </input>
    </div>
</xsl:template>
