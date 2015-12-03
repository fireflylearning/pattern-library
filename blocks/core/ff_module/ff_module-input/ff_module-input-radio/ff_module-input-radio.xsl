<xsl:template name="ff_module-input-radio">
    <xsl:param name="data" />
    <xsl:variable name="input" select="$data//input"/>


    <div class="ff_module-input-radio">
        <input type="radio" class="ff_module-input-radio__input">

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

            <xsl:if test="$input/@checked='true'">
                <xsl:attribute name="checked">
                   <xsl:text>
                       true
                   </xsl:text>
                </xsl:attribute>
            </xsl:if>
        </input>
        <label class="ff_module-input-radio__label">
            <xsl:if test="not($input/@id='')">
                <xsl:attribute name="for">
                   <xsl:value-of select="$input/@id"/>
                </xsl:attribute>
            </xsl:if>
            <xsl:value-of select="$input" />
        </label>
    </div>
</xsl:template>
