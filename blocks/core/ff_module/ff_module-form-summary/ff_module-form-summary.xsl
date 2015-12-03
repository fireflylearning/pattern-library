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
            <xsl:for-each select="$summary/items/item">
                <dt class="ff_module-form-summary__list-item-title">
                <xsl:value-of select="./title"/>
                </dt>
                <xsl:for-each select="./data">
                <dd class="ff_module-form-summary__list-item-data">
                <xsl:value-of select="."/>
                </dd>
                </xsl:for-each>
            </xsl:for-each>
            </dl>
        </div>
    </div>
</xsl:template>
