<xsl:template name="ff_module-planner-preview">
    <xsl:param name="data" />
    
    <div class="ff_module-planner-preview">
        
        <!-- Now and Next events -->
        <xsl:for-each select="$data/event[@planner-preview-label = 'Now' or @planner-preview-label = 'Next'] | $data/gap">
            <ol class="ff_module-planner-preview__events ff_module-planner-preview__events--{@planner-preview-label}">
                <li class="ff_module-planner-preview__event">
                    <p class="ff_module-planner-preview__label"><xsl:value-of select="@planner-preview-label"/></p>
                    <xsl:choose>
                        <!-- gaps -->
                        <xsl:when test="name(.) = 'gap'">
                            <p class="ff_module-planner-preview__gap">There are no events in your timetable</p>
                        </xsl:when>
                        <!-- events -->
                        <xsl:otherwise>       
                            <p class="ff_module-planner-preview__data ff_module-planner-preview__data--subject-important"><a href="{@url}" class="ff_module-planner-preview__link"><span data-ff="planner-event-subject"><xsl:value-of select="@subject"/></span><xsl:text>, </xsl:text><xsl:value-of select="@description"/></a></p>
                            <p class="ff_module-planner-preview__data ff_module-planner-preview__data--time"><xsl:value-of select="@starttime"/><xsl:text> - </xsl:text><xsl:value-of select="@endtime"/></p>
                            <p class="ff_module-planner-preview__data ff_module-planner-preview__data--location"><xsl:value-of select="@location"/></p>
                            <p class="ff_module-planner-preview__data ff_module-planner-preview__data--date"><xsl:value-of select="@start-date-display"/></p>
                        </xsl:otherwise>
                    </xsl:choose>
                </li>
            </ol>
        </xsl:for-each>
        
        <!-- Later events -->
        <ol class="ff_module-planner-preview__events ff_module-planner-preview__events--Later">
            <xsl:for-each select="$data/event[@planner-preview-label = 'Later']">
                <xsl:if test="position() &lt;= 3">
                    <li class="ff_module-planner-preview__event">
                        <p class="ff_module-planner-preview__label">Later</p>
                        <p class="ff_module-planner-preview__data ff_module-planner-preview__data--subject"><a href="{@url}" class="ff_module-planner-preview__link"><span data-ff="planner-event-subject"><xsl:value-of select="@subject"/></span><xsl:text>, </xsl:text><xsl:value-of select="@description"/></a></p>
                        <p class="ff_module-planner-preview__data ff_module-planner-preview__data--time"><xsl:value-of select="@starttime"/><xsl:text> - </xsl:text><xsl:value-of select="@endtime"/><xsl:text> </xsl:text><span class="ff_module-planner-preview__data--date"><xsl:value-of select="@start-date-display"/></span></p>
                    </li>
                </xsl:if>
            </xsl:for-each>
        </ol>
        
        
    </div>
    
</xsl:template>