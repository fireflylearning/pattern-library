<xsl:template name="ff_module-segments">
   <xsl:param name="data" />
   <div class="ff_module-segments {$data/classes}">
       <ul class="ff_module-segments__list">
           <xsl:for-each select="$data/items/item">
                <li class="ff_module-segments__item">
                    <a href="{@url}">
                        <xsl:attribute name="class">
                            <xsl:choose>
                                <xsl:when test="@active = 'true'">ff_module-segments__link ff_module-segments__link--active</xsl:when>
                                <xsl:otherwise>ff_module-segments__link</xsl:otherwise>
                            </xsl:choose>
                        </xsl:attribute>
                        <xsl:value-of select="."/>
                    </a>
                </li>
           </xsl:for-each>
       </ul>
   </div>
</xsl:template>
