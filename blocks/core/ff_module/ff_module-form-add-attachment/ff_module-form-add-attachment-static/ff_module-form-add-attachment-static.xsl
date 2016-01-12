<xsl:template name="ff_module-form-add-attachment-static">
    <xsl:param name="data" />

    <div class="ff_module-form-add-attachment" id="{$data/add-attachment/@id}">
        <div class="ff_module-form-add-attachment__dnd">
            <span class="ff_icon ff_icon-download-to-greyblue ff_module-form-add-attachment__icon"></span>
            <span class="ff_module-form-add-attachment__dnd-text">Drag files here to attach them</span>
        </div>
        <div class="ff_module-form-add-attachment__buttons">
            <xsl:call-template name="ff_module-dropdown-button">
                <xsl:with-param name="data" select="ext:node-set($data/add-attachment)"/>
            </xsl:call-template>
        </div>
    </div>
    <!-- <xsl:choose> -->
        <!-- <xsl:when test="count($data/add-attachment/attachments/attachment) > 0"> -->
        <!-- <xsl:call-template name="ff_module-file-list">
            <xsl:with-param name="data" select="ext:node-set($data/add-attachment)"/>
        </xsl:call-template> -->
        <!-- </xsl:when> -->
        <!-- <xsl:otherwise> -->
        <div class="ff_module-form-add-attachment__filelist">
            <span class="ff_module-form-add-attachment__no-files-message">No files attached</span>
        </div>
        <!-- </xsl:otherwise> -->
        <!-- </xsl:choose> -->
</xsl:template>
