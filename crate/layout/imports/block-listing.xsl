<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/layout/imports/call-templates.xsl"/>

    <xsl:template match="page/blocks">

        <div class="crate_blocks">
            {% for block in blocklist %}

                <div class="crate_blocks__item" id="{{block.basename}}">
                    <h3 class="crate_blocks__item__heading">{{block.basename}}</h3>

                    <div class="crate_blocks__content">
                        <xsl:call-template name="call-{{block.basename}}"/>
                    </div>

                    <a href="{{block.link}}" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>

                </div>

            {% endfor %}
        </div>
    </xsl:template>


</xsl:stylesheet>

