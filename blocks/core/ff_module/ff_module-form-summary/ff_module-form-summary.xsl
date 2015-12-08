<xsl:template name="ff_module-form-summary">
    <xsl:param name="data" />
    <xsl:variable name="summary" select="$data/summary"/>

    <div class="ff_module-form-summary">
        <div class="ff_module-form-summary__header">
            <h3 class="ff_module-form-summary__title">
                <xsl:value-of select="$summary/@title"/>
            </h3>
        </div>
        <div class="ff_module-form-summary__content">
            <dl class="ff_module-form-summary__list">

            <xsl:for-each select="$summary//item">
                <dt class="ff_module-form-summary__list__title">
                <xsl:value-of select="./@title"/>
                </dt>
                <xsl:apply-templates select="data" mode="list-summary-data"/>
            </xsl:for-each>
            </dl>
        </div>
    </div>
</xsl:template>


<xsl:template match="data" mode="list-summary-data">
    <dd class="ff_module-form-summary__list__data">
    <xsl:choose>
        <xsl:when test="./@url">
            <a href="{./@url}" class="ff_module-form-summary__list__link">
                <xsl:value-of select="." />
            </a>
        </xsl:when>
        <xsl:otherwise>
            <xsl:value-of select="." />
        </xsl:otherwise>
    </xsl:choose>
    </dd>
</xsl:template>
