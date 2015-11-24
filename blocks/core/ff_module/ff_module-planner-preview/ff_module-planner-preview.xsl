<xsl:template name="ff_module-planner-preview">
    <xsl:param name="data" />
    
    <div class="ff_module-planner-preview">
        
        <xsl:for-each select="$data/event">
                <xsl:if test="@label = 'Now' or @label = 'Next'">
                    <ol class="ff_module-planner-preview__events ff_module-planner-preview__events--{@label}">
                        <xsl:call-template name="ff_module-planner-preview-event">
                            <xsl:with-param name="label" select="@label"/>
                            <xsl:with-param name="subject" select="@subject"/>
                            <xsl:with-param name="description" select="@description"/>
                            <xsl:with-param name="date" select="@date"/>
                            <xsl:with-param name="starttime" select="@starttime"/>
                            <xsl:with-param name="endtime" select="@endtime"/>
                            <xsl:with-param name="location" select="@location"/>
                        </xsl:call-template>
                    </ol>
                </xsl:if>              
        </xsl:for-each>
        
        <ol class="ff_module-planner-preview__events ff_module-planner-preview__events--later">
        <xsl:for-each select="$data/event">
            <xsl:if test="@label = 'Now' or @label = 'Next'">
                <li class="ff_module-planner-preview__event">
                    <p class="ff_module-planner-preview__label">Later</p>
                    <p class="ff_module-planner-preview__data ff_module-planner-preview__data--subject"><a href="#" class="ff_module-planner-preview__link"><xsl:value-of select="@subject"/><xsl:text> with </xsl:text><xsl:value-of select="@description"/></a></p>
                    <p class="ff_module-planner-preview__data ff_module-planner-preview__data--time"><xsl:value-of select="@starttime"/><xsl:text> - </xsl:text><xsl:value-of select="@endtime"/></p>
                </li>
            </xsl:if>
        </xsl:for-each>
        </ol>

    </div>
    
</xsl:template>

<xsl:template name="ff_module-planner-preview-event">
    <xsl:param name="label"/>
    <xsl:param name="subject"/>
    <xsl:param name="description"/>
    <xsl:param name="date"/>
    <xsl:param name="starttime"/>
    <xsl:param name="endtime"/>
    <xsl:param name="location"/>
    <li class="ff_module-planner-preview__event">
        <p class="ff_module-planner-preview__label"><xsl:value-of select="$label"/></p>
        <p class="ff_module-planner-preview__data ff_module-planner-preview__data--subject"><a href="#" class="ff_module-planner-preview__link"><xsl:value-of select="$subject"/><xsl:text> with </xsl:text><xsl:value-of select="$description"/></a></p>
        <p class="ff_module-planner-preview__data ff_module-planner-preview__data--date"><xsl:value-of select="$date"/></p>
        <p class="ff_module-planner-preview__data ff_module-planner-preview__data--time"><xsl:value-of select="$starttime"/><xsl:text> - </xsl:text><xsl:value-of select="$endtime"/></p>
        <p class="ff_module-planner-preview__data ff_module-planner-preview__data--location"><xsl:value-of select="$location"/></p>
    </li>
</xsl:template>