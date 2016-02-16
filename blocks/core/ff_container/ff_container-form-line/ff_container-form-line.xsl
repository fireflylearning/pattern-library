<xsl:template name="ff_container-form-line">
    <xsl:param name="data" />
    <xsl:variable name="line" select="$data//form-line"/>

    <div>

        <xsl:attribute name="class">
            <xsl:text>ff_container-form-line</xsl:text>
            <xsl:if test="$line/errors/error[@show='true']"> ff_container-form-line--has-error</xsl:if>
        </xsl:attribute>

        <xsl:if test="$line/@error_message">
            <xsl:attribute name="data-ff-validation-error-message">
                <xsl:value-of select="$line/@error_message"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:if test="$line/@error_input_id">
            <xsl:attribute name="data-ff-validation-error-input-id">
                <xsl:value-of select="$line/@error_input_id"/>
            </xsl:attribute>
        </xsl:if>

        <xsl:for-each select="$line/item">

            <div>
                <xsl:attribute name="classes">
                    <xsl:text>ff_container-form-line__item</xsl:text>
                    <xsl:if test="./@modifier"> ff_container-form-line__item--<xsl:value-of select="./@modifier"/></xsl:if>
                </xsl:attribute>
                <xsl:copy-of select="node()"/>
            </div>


        </xsl:for-each>

        <xsl:if test="$line/errors">
            <div class="ff_container-form-line__error-messages">
                <xsl:for-each select="$line/errors/error">
                  <span class="ff_container-form-line__error--{@type}"><xsl:value-of select="@message"/></span>
                </xsl:for-each>
            </div>
        </xsl:if>

    </div>
</xsl:template>
