<xsl:template name="ff_module-planner-note">
    <xsl:param name="data" />
    <xsl:variable name="ui-nodes">
        <buttons>
            <button id="lesson">
                <text>Write lesson plan</text>
                <icon>test</icon>
            </button>
        </buttons>
    </xsl:variable>
    <xsl:variable name="ui-buttons" select="ext:node-set($ui-nodes)/buttons" />

    <div class="ff_module-planner-note">
        <xsl:if test="$data/event/note != ''">
        <div class="ff_util-prose">
            <xsl:value-of select="$data/event/note" disable-output-escaping="yes"/>
        </div>
        </xsl:if>

        <xsl:if test="not($data/event/note != '')">
            <xsl:call-template name="ff_module-button">
                <xsl:with-param name="data" select="$ui-buttons/button[@id='lesson']"/>
            </xsl:call-template>
        </xsl:if>
    </div>
</xsl:template>
