<xsl:template name="block-listing" match="page/blocks">

        <div class="crate_blocks">
            {% for block in blocks %}

                <div class="crate_blocks__item" id="{{block.info.basename}}">
                    <h3 class="crate_blocks__item__heading"><a href="{{block.info.url}}">{{block.info.basename}}</a></h3>

                    <div class="crate_blocks__content">
                        <xsl:call-template name="call-{{block.info.basename}}"/>
                    </div>

                    <a href="{{block.info.url}}" class="crate_blocks__item__link"><span class="crate_blocks__item__link__text">View block</span></a>

                </div>

            {% endfor %}
        </div>
    </xsl:template>
