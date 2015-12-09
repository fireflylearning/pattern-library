<xsl:template name="ff_module-recipient-picker-static">
    <xsl:param name="data" />

    <div class="ff_module-recipient-picker">
        <div class="ff_module-recipient-picker__main">
            <xsl:call-template name="ff_module-recipient-picker-selected-list">
                <xsl:with-param name="data" >
                    <xsl:copy-of select="ext:node-set($data//selected)"/>
                </xsl:with-param>
            </xsl:call-template>

            <input class="ff_module-recipient-picker__input ff_module-form-input ff_module-form-input--invisible"/>

        </div>
        <div class="ff_module-recipient-picker__selectable">
            <xsl:call-template name="ff_module-recipient-button-list">
                <xsl:with-param name="data" >
                    <xsl:copy-of select="ext:node-set($data//results)"/>
                </xsl:with-param>
            </xsl:call-template>
        </div>
    </div>
</xsl:template>
