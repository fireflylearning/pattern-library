<xsl:template name="ff_module-group-icon-and-name">
    <xsl:param name="data" />
    <div class="ff_module-group-icon-and-name">
        <figure class="ff_module-group-icon-and-name__picture">
            <span class="ff_icon ff_icon-group ff_module-group-icon-and-name__icon"/>
        </figure>
        <a class="ff_module-group-icon-and-name__name" href="{url}"><xsl:value-of select="name"/></a>
    </div>
</xsl:template>
