<xsl:template name="ff_module-segments">
   <xsl:param name="data" />
   <div class="ff_module-segments {$data/items/@modifiers}">
       <ul class="ff_module-segments__list">
           <xsl:for-each select="$data/items/item">
                <li class="ff_module-segments__item">
                    <a href="{@url}">
                        <xsl:attribute name="class">
                            <xsl:text>ff_module-segments__link</xsl:text>
                            <xsl:if test="@active = 'true'"> ff_module-segments__link--active</xsl:if>
                        </xsl:attribute>
                        <span class="ff_module-segments__label"><xsl:value-of select="."/></span>
                    </a>
                </li>
           </xsl:for-each>
       </ul>
   </div>
</xsl:template>
