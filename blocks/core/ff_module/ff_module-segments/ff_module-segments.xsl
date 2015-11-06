<xsl:template name="ff_module-segments">
   <xsl:param name="data" />
   <div class="ff_module-segments {$data/classes}">
       <ul class="ff_module-segments__items">
           <xsl:for-each select="$data/items/item">
               <li class="ff_module-segments__item"><xsl:value-of select="."/></li>
           </xsl:for-each>
       </ul>
   </div>
</xsl:template>
