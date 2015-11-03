<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/layout/imports/call-templates.xsl"/>

    <xsl:template match="page/blocks">

        <div class="crate_blocks">
            

                <div class="crate_blocks__item" id="ff_module-title">
                    <h3 class="crate_blocks__item__heading">ff_module-title</h3>

                    <div class="crate_blocks__content">
                        <xsl:call-template name="call-ff_module-title"/>
                    </div>

                    <a href="/blocks-x/ff_module-title/ff_module-title.xml" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>

                </div>

            

                <div class="crate_blocks__item" id="ff_module-button">
                    <h3 class="crate_blocks__item__heading">ff_module-button</h3>

                    <div class="crate_blocks__content">
                        <xsl:call-template name="call-ff_module-button"/>
                    </div>

                    <a href="/blocks-x/ff_module-button/ff_module-button.xml" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>

                </div>

            

                <div class="crate_blocks__item" id="ff_module-button--wide">
                    <h3 class="crate_blocks__item__heading">ff_module-button--wide</h3>

                    <div class="crate_blocks__content">
                        <xsl:call-template name="call-ff_module-button--wide"/>
                    </div>

                    <a href="/blocks-x/ff_module-button/ff_module-button--wide/ff_module-button--wide.xml" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>

                </div>

            
        </div>
    </xsl:template>


</xsl:stylesheet>

