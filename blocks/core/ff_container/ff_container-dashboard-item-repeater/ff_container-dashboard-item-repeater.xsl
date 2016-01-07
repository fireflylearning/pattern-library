<xsl:template name="ff_container-dashboard-item-repeater">
    <xsl:param name="data" />
    
    <div class="ff_container-dashboard-item-repeater">
        <ul class="ff_container-dashboard-item-repeater__items">
            <xsl:for-each select="$data/items/item">
                <li class="ff_container-dashboard-item-repeater__item"><xsl:value-of select="."/></li>
            </xsl:for-each>
        </ul>
    </div>
    
</xsl:template>