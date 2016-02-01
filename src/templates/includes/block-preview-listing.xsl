<xsl:template name="block-listing" match="page/blocks">

    <div class="crate_blocks">
        {% for block in blocks %}

            <div class="crate_blocks__item" id="{{block.name}}">
                <h3 class="crate_blocks__item__heading"><a href="{{block.urlPath}}">{{block.name}}</a></h3>

                <div class="crate_blocks__content">
                    <xsl:call-template name="call-{{block.name}}"/>
                </div>

                <a href="{{block.urlPath}}" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>

            </div>

        {% endfor %}
    </div>
</xsl:template>
