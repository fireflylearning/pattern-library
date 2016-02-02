{%- if blocks -%}
{% for block in blocks -%}
    {%- set blockXSLPath = '../../../'+block.name|resourcePath('.xsl') -%}

    {%- if blockXSLPath -%}
    {% include blockXSLPath with {blockname: block.name} %}

    <xsl:template name="call-{{block.name}}">
        <xsl:for-each select="block[@id='{{block.name}}']">
            <xsl:call-template name="{{block.name}}">
                <xsl:with-param name="data" select="."/>
            </xsl:call-template>
            <br/>
        </xsl:for-each>
    </xsl:template>
    {%- endif -%}

{%- endfor -%}
{%- endif -%}

{%- if requires.length -%}
{%- for required in requires -%}
    {%- set reqPath = '../../../'+required|resourcePath('.xsl') -%}
    {% include reqPath %}
{%- endfor -%}
{%- endif -%}
