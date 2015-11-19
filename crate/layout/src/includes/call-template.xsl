{% for block in blocks %}
{% set p = '../../../../' + block.info.basepath + '.xsl' %}
{% include p %}
{% endfor %}


{% for block in blocks %}
<xsl:template name="call-{{block.info.basename}}">
    <xsl:for-each select="block[@id='{{block.info.basename}}']">
        <xsl:call-template name="{{block.info.basename}}">
            <xsl:with-param name="data" select="."/>
        </xsl:call-template>
        <br/>
    </xsl:for-each>
</xsl:template>
{% endfor %}
