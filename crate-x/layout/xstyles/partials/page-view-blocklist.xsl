<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:import href="/layout/xstyles/page-view.xsl"/>
    <xsl:import href="/layout/xstyles/partials/call-templates.xsl"/>

    <xsl:template match="page/blocks">


            {% for block in blocks %}
                {% for name, contexts in block %}
                {% for context in contexts %}

                    <h3>{{name}}</h3>
                    <xsl:call-template name="call-{{name}}"/>


                {% endfor %}
                {% endfor %}
                <hr/>
            {% endfor %}

    </xsl:template>


</xsl:stylesheet>

