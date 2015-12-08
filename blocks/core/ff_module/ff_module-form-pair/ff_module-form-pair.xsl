<xsl:template name="ff_module-form-pair">
    <xsl:param name="data" />
    <xsl:variable name="pair" select="$data//form-pair"/>
    <xsl:variable name="modifier">
        <xsl:choose>
            <xsl:when test="not($pair/@modifier = '')">
                <xsl:value-of select="$pair/@modifier" />
            </xsl:when>
            <xsl:otherwise>default</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <div class="ff_module-form-pair ff_module-form-pair--{$modifier}">
        <xsl:for-each select="$pair/*">

            <xsl:variable name="node" select="local-name(.)"/>
            <xsl:choose>
                <xsl:when test="$node = 'label'">
                    <xsl:variable name="current">
                        <xsl:copy>
                            <xsl:attribute name="classes">
                                <xsl:text>ff_module-form-pair__label ff_module-form-pair__label--</xsl:text><xsl:value-of select="$modifier"/>
                            </xsl:attribute>
                            <xsl:apply-templates select="@*|node()" />
                        </xsl:copy>
                    </xsl:variable>
                    <xsl:call-template name="ff_module-form-label">
                        <xsl:with-param name="data" select="ext:node-set($current)"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:variable name="current">
                        <xsl:copy>
                            <xsl:attribute name="classes">
                                <xsl:text>ff_module-form-pair__item ff_module-form-pair__item--</xsl:text><xsl:value-of select="$modifier"/>
                            </xsl:attribute>
                            <xsl:apply-templates select="@*|node()" />
                        </xsl:copy>
                    </xsl:variable>
                    <xsl:call-template name="ff_module-form-input">
                        <xsl:with-param name="data" select="ext:node-set($current)"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>

        </xsl:for-each>
    </div>
</xsl:template>

<xsl:template match="@*|node()">
    <xsl:copy>
        <xsl:apply-templates select="@*|node()"/>
    </xsl:copy>
</xsl:template>
