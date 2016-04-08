<xsl:template name="ff_container-landing-section">
    <xsl:param name="data" />
    <section class="ff_container-landing-section">
        <header class="ff_container-landing-section__header ff_container-landing-section__header--{$data/item/@modifiers}">
            <h2 class="ff_container-landing-section__title"><xsl:value-of select="$data/item/@title"/></h2>
        </header>
        <div>
            <xsl:attribute name="class">
                <xsl:text>ff_container-landing-section__main</xsl:text>
                <xsl:if test="$data/item/@show-footer = 'no'"> ff_container-landing-section__main--no-footer</xsl:if>
            </xsl:attribute>
            <xsl:for-each select="$data//module">
               <xsl:copy-of select="./node()"/>
            </xsl:for-each>
        </div>
        <xsl:if test="not($data/item/@show-footer = 'no')">
        <footer class="ff_container-landing-section__footer">
            <a href="{$data/item/@more-page-link}" class="ff_container-landing-section__more-link"><xsl:value-of select="$data/item/@more-page-text"/></a>
        </footer>
        </xsl:if>
    </section>
</xsl:template>