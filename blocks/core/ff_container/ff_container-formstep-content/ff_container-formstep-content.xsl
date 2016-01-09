<xsl:template name="ff_container-formstep-content">
	<xsl:param name="data" />
    <xsl:variable name="modifier" select="$data/formsteps/@modifier"/>
    <xsl:variable name="class-with-mod">
        <xsl:choose>
            <xsl:when test="not($modifier='')">ff_container-formstep-content ff_container-formstep-content--<xsl:value-of select="$modifier"/></xsl:when>
            <xsl:otherwise>ff_container-formstep-content</xsl:otherwise>
        </xsl:choose>
    </xsl:variable>

    <xsl:for-each select="$data/formsteps/step">
	    <fieldset id="{@id}">

    	    <xsl:if test="data">
                <xsl:for-each select="data/attr">
                    <xsl:attribute name="{@name}">
                        <xsl:value-of select="."/>
                    </xsl:attribute>
                </xsl:for-each>
            </xsl:if>

            <xsl:attribute name="class">
                <xsl:choose>
                    <xsl:when test="not(@state='')"><xsl:value-of select="$class-with-mod"/> ff_container-formstep-content--<xsl:value-of select="@state"/></xsl:when>
                    <xsl:otherwise>ff_container-formstep-content</xsl:otherwise>
                </xsl:choose>
            </xsl:attribute>

            <xsl:copy-of select="content/node()"/>

	    </fieldset>
    </xsl:for-each>

</xsl:template>
