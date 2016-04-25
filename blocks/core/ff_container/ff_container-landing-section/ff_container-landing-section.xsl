<xsl:template name="ff_container-landing-section">
    <xsl:param name="data" />
    <section class="ff_container-landing-section ff_container-landing-section">
        <header class="ff_container-landing-section__header">
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
            <a href="{$data/item/@more-page-link}" class="ff_container-landing-section__more-link">
                <xsl:value-of select="$data/item/@more-page-text"/>
                <span class="ff_icon ff_icon-right"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm7.586 0L6.293 5.707a.999.999 0 1 1 1.414-1.414l3 3a.999.999 0 0 1 0 1.414l-3 3a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414L8.586 8z"/></svg></span>
            </a>
        </footer>
        </xsl:if>
    </section>
</xsl:template>