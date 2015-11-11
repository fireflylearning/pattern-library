{% for block in blocks %}
    {% set p = '../../../../' + block.basepath + '.xsl' %}
    {% include p %}
{% endfor %}

{% for block in blocks %}
<xsl:template name="call-{{block.basename}}">
    <xsl:for-each select="block[@id='{{block.basename}}']">
        <xsl:call-template name="{{block.basename}}">
            <xsl:with-param name="data" select="."/>
        </xsl:call-template>
    </xsl:for-each>
</xsl:template>
{% endfor %}
