<xsl:template name="ff_module-planner-note">
    <xsl:param name="data" />
    <xsl:variable name="ui-nodes">
        <buttons>
            <button id="lessonplan_add">
                <text>Write lesson plan</text>
                <icon>test</icon>
                <action>editor-inline-start</action>
                <modifiers>ff_module-button--tertiary</modifiers>
            </button>
            <button id="lessonplan_edit">
                <text>Edit lesson plan</text>
                <icon>test</icon>
                <action>editor-inline-start</action>
                <modifiers>ff_module-button--tertiary</modifiers>
            </button>
        </buttons>
    </xsl:variable>
    <xsl:variable name="ui-buttons" select="ext:node-set($ui-nodes)/buttons" />

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
                        <xsl:with-param name="data" select="$ui-buttons/button[@id='lessonplan_add']"/>
                    </xsl:call-template>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:call-template name="ff_module-button">
                        <xsl:with-param name="data" select="$ui-buttons/button[@id='lessonplan_edit']"/>
                    </xsl:call-template>
                </xsl:otherwise>
            </xsl:choose>
        </div>

    </div>
</xsl:template>
