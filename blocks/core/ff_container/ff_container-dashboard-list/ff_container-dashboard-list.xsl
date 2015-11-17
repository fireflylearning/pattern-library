<xsl:template name="ff_container-dashboard-list">
    <xsl:param name="data" />
    
    <div class="ff_container-dashboard-list">
        <ul class="ff_container-dashboard-list__items">
            <xsl:for-each select="$data/items/item">
                <li class="ff_container-dashboard-list__item"><xsl:value-of select="."/></li>
            </xsl:for-each>
        </ul>
    </div>
    
</xsl:template>