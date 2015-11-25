<xsl:template name="ff_container-dashboard-section">
    <xsl:param name="data" />
    <section class="ff_conatiner-dashboard-section {$data/item/@modifiers}">
        <header class="ff_container-dashboard-section__header">
            <h2 class="ff_container-dashboard-section__title"><xsl:value-of select="$data/item/@title"/></h2>
        </header>
        <div>
            <xsl:attribute name="class">
                <xsl:text>ff_container-dashboard-section__main</xsl:text>
                <xsl:if test="$data/item/@show-footer = 'no'"> ff_container-dashboard-section__main--no-footer</xsl:if>
            </xsl:attribute>
            <p>Modules Go here</p>
        </div>
        <xsl:if test="not($data/item/@show-footer = 'no')">
        <footer class="ff_container-dashboard-section__footer">
            <a href="{$data/item/@more-page-link}" class="ff_container-dashboard-section__more-link"><xsl:value-of select="$data/item/@more-page-text"/></a>
        </footer>
        </xsl:if>
    </section>
</xsl:template>