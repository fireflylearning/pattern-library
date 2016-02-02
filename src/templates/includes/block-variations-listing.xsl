<xsl:template match="blocks">
    {%- for block in blocks -%}
    {%- set blockXSLPath = block.name|resourcePath('.xsl') -%}
    {%- if blockXSLPath -%}
    <h3>{{block.name}}</h3>
    <xsl:call-template name="call-{{block.name}}"/>
    {%- endif -%}
    {%- endfor -%}
    <br/>
</xsl:template>
