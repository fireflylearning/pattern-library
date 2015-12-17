<xsl:template name="ff_module-planner-note">
    <xsl:param name="data" />

    <xsl:variable name="ui-button-lessonplan-add">
        <button id="lessonplan_add" icon="test" modifier="tertiary">
            <text>Write lesson plan</text>
            <data attr="data-ff-action">editor-inline-start</data>
        </button>
    </xsl:variable>
    <xsl:variable name="ui-button-lessonplan-edit">
        <button id="lessonplan_edit" icon="test" modifier="tertiary">
            <text>Edit lesson plan</text>
            <data attr="data-ff-action">editor-inline-start</data>
        </button>
    </xsl:variable>

    <xsl:variable name="has-a-note">
        <xsl:if test="$data/event/note != ''">true</xsl:if>
    </xsl:variable>
    
    
    <div class="ff_module-planner-note ff-jseditor-inline" data-ff="editor-inline">
        <div data-ff="editor-inline-toolbar"></div>
        <div data-ff="editor-inline-content">
            <xsl:attribute name="class">
                <xsl:text>ff_util-prose ff_module-planner-note__content</xsl:text>
                <xsl:if test="not($has-a-note = 'true')"> ff_module-planner-note__content--empty</xsl:if>
            </xsl:attribute>
            <xsl:value-of select="$data/event/note" disable-output-escaping="yes"/>
        </div>
        
        <div class="ff_util-prose ff_module-planner-note__actions">
            <xsl:choose>
                <xsl:when test="not($has-a-note = 'true')">
                    <xsl:call-template name="ff_module-button">
                        <xsl:with-param name="data" select="ext:node-set($ui-button-lessonplan-add)"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="ff_module-button">
                        <xsl:with-param name="data" select="ext:node-set($ui-button-lessonplan-edit)"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </div>

    </div>
</xsl:template>
