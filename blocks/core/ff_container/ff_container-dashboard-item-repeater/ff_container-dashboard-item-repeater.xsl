<xsl:template name="ff_container-dashboard-item-repeater">
    <xsl:param name="data" />

    <div class="ff_container-dashboard-item-repeater">
        <ul class="ff_container-dashboard-item-repeater__items">
            <xsl:for-each select="$data//item">
                <li class="ff_container-dashboard-item-repeater__item">
                  <xsl:copy-of select="node()"/>
                </li>
            </xsl:for-each>
        </ul>
    </div>

</xsl:template>
