<xsl:template name="ff_container-formstep-content">
	<xsl:param name="data" />
	    
	    <fieldset id="{$data/formstep-content/@id}">
    	    
    	    <xsl:if test="$data/formstep-content/data">
                <xsl:for-each select="$data/formstep-content/data">
                    <xsl:attribute name="{./@attr}">
                        <xsl:value-of select="."/>
                    </xsl:attribute>
                </xsl:for-each>
            </xsl:if>
            
            <xsl:attribute name="class">
                <xsl:text>ff_container-formstep-conatiner</xsl:text>
                <xsl:text> ff_container-formstep-conatiner--</xsl:text><xsl:value-of select="$data/formstep-content/@modifier"/>
                <xsl:text> </xsl:text><xsl:value-of select="$data/formstep-content/@classes"/>
            </xsl:attribute>
    	    
	    </fieldset>
	    
</xsl:template>