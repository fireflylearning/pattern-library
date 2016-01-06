<xsl:template name="ff_module-file-list">
    <xsl:param name="data" />

    <div class="ff_module-file-list">

        <xsl:attribute name="class">
            <xsl:text>ff_module-file-list</xsl:text>
            <xsl:text> </xsl:text><xsl:value-of select="$data/attachments/@classes"/>
        </xsl:attribute>
        
        <xsl:if test="$data/attachments/data">
            <xsl:for-each select="$data/attachments/data">
                <xsl:attribute name="{./@attr}">
                    <xsl:value-of select="."/>
                </xsl:attribute>
            </xsl:for-each>
        </xsl:if>

        <ul class="ff_module-file-list__items">

            <xsl:for-each select="$data/attachments/attachment">
                <li class="ff_module-file-list__item">

                    <xsl:variable name="current-attachment">
                        <xsl:copy-of select="."/>
                    </xsl:variable>

                    <xsl:call-template name="ff_module-file">
                        <xsl:with-param name="data" select="ext:node-set($current-attachment)"/>
                    </xsl:call-template>

                </li>
            </xsl:for-each>

        </ul>

    </div>

</xsl:template>