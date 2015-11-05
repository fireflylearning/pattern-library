<xsl:template name="ff_module-segments">
   <xsl:param name="data" />
   <div class="ff_module-segments {$data/classes}">
       <ul>
           <xsl:for-each select="$data/items/item">
               <li><xsl:value-of select="."/></li>
           </xsl:for-each>
       </ul>
   </div>
</xsl:template>
