<xsl:template name="ff_module-form-preview">
    <xsl:param name="data" />
    <xsl:variable name="preview" select="$data/preview"/>

    <div class="ff_module-form-preview">
        <dl class="ff_module-form-preview__list">

        <xsl:for-each select="$preview/item">

            <xsl:variable name="edit">
                <edit
                    id="to-do"
                    class="ff_module-form-preview__edit-link"
                    url="{./@url}">Edit</edit>
            </xsl:variable>

            <dt class="ff_module-form-preview__list__title">
            <span class="ff_module-form-preview__list__title__text"><xsl:value-of select="./@title"/></span>

            <xsl:if test="not(./@url = '')">
                <xsl:call-template name="ff_module-inline-edit">
                    <xsl:with-param name="data" select="ext:node-set($edit)" />
                </xsl:call-template>
            </xsl:if>

            </dt>
            <dd class="ff_module-form-preview__list__data">
                <xsl:if test="@preview-for">
                    <xsl:attribute name="data-ff-preview-for">
                        <xsl:value-of select="@preview-for"/>
                    </xsl:attribute>
                </xsl:if>
            <xsl:choose>
                <xsl:when test="./list">
                    <dl class="ff_module-form-preview__sublist">
                    <xsl:apply-templates select="list/item" mode="list-preview-dl"/>
                    </dl>
                </xsl:when>
                <xsl:when test="./html">
                    <xsl:apply-templates select="html" mode="list-preview-html"/>
                </xsl:when>
                <xsl:otherwise>
                    <xsl:value-of select="." />
                </xsl:otherwise>
            </xsl:choose>
            </dd>
        </xsl:for-each>
        </dl>
    </div>
</xsl:template>

<xsl:template match="list/item" mode="list-preview-dl">
    <dt class="ff_module-form-preview__sublist__title">
    <xsl:value-of select="./@title"/>
    </dt>
    <dd class="ff_module-form-preview__sublist__data">
        <xsl:if test="@preview-for">
            <xsl:attribute name="data-ff-preview-for">
                <xsl:value-of select="@preview-for"/>
            </xsl:attribute>
        </xsl:if>
        <xsl:value-of select="." />
    </dd>
</xsl:template>

<xsl:template match="html" mode="list-preview-html">
    <div class="ff_module-form-preview__list__description">
    <xsl:value-of select="." disable-output-escaping="yes" />
    </div>
</xsl:template>
