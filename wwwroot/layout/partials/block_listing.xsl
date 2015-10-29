<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/blocks-xslt/ff_module-button/ff_module-button.xsl"/>

    <xsl:import href="/blocks-xslt/ff_module-title/ff_module-title.xsl"/>



    <xsl:template match="page">
        <div class="crate_blocks">
            <xsl:apply-templates select="blocks/"/>
        </div>
    </xsl:template>

    <xsl:template match="blocks/*">
        <div class="crate_blocks__item" id="{./@name}">
            <h3 class="crate_blocks__item__heading"><xsl:value-of select="./@name"/></h3>
            <div class="crate_blocks__content">
                <xsl:apply-templates select="."/>
            </div>

            <a href="{{file.link}}" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>
        </div>
    </xsl:template>

</xsl:stylesheet>

