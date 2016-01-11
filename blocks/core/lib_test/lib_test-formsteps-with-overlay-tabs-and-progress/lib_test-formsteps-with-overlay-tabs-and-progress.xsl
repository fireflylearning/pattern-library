<xsl:template name="lib_test-formsteps-with-overlay-tabs-and-progress">
    <xsl:param name="data" />

    <xsl:variable name="header-content">
        <page-header title="Add a task">
            <controls>
                <content>
                    <xsl:call-template name="ff_module-formsteps">
                        <xsl:with-param name="data" select="$data"/>
                    </xsl:call-template>
                </content>
            </controls>
        </page-header>
    </xsl:variable>

    <xsl:variable name="step-content">
        <formsteps>
            <step state="is-current" id="step1">
                <label tab-attr-name="data-ff-formsteps-trigger">Recipients</label>
                <content tab-attr-name="data-ff-formsteps-target">
                    <div class="ff_container-page">

                        <h2>Select recipients</h2>

                        <div class="ff_grid ff_grid--1-1">
                            <div class="ff_grid__column">

                                <xsl:call-template name="ff_module-recipient-picker-component" >
                                    <xsl:with-param name="data" select="$data" />
                                </xsl:call-template>

                                <xsl:call-template name="ff_module-recipient-picker-new-group-button">
                                    <xsl:with-param name="data" select="$data" />
                                </xsl:call-template>
                            </div>
                            <div class="ff_grid__column">

                                <div>
                                    <xsl:call-template name="ff_module-tabs-navigation" >
                                        <xsl:with-param name="data" select="$data" />
                                    </xsl:call-template>

                                    <xsl:call-template name="ff_container-tabs-content" >
                                        <xsl:with-param name="data" select="$data" />
                                    </xsl:call-template>

                                </div>
                            </div>
                        </div>
                    </div>
                </content>
            </step>
            <step state="" id="step2">
                <label tab-attr-name="data-ff-formsteps-trigger">Details</label>
                <content tab-attr-name="data-ff-formsteps-target"><div class="ff_container-page">Details Content</div></content>
            </step>
            <step state="" id="step3">
                <label tab-attr-name="data-ff-formsteps-trigger">Description</label>
                <content tab-attr-name="data-ff-formsteps-target"><div class="ff_container-page">Description Content</div></content>
            </step>
            <step state="" id="step4">
                <label tab-attr-name="data-ff-formsteps-trigger">Attachments</label>
                <content tab-attr-name="data-ff-formsteps-target"><div class="ff_container-page">Attachments Content</div></content>
            </step>
            <step state="" id="step5">
                <label tab-attr-name="data-ff-formsteps-trigger">Preview</label>
                <content tab-attr-name="data-ff-formsteps-target"><div class="ff_container-page">Preview Content</div></content>
            </step>
        </formsteps>
    </xsl:variable>

    <xsl:call-template name="ff_container-page-header">
        <xsl:with-param name="data" select="ext:node-set($header-content)"/>
    </xsl:call-template>


    <xsl:call-template name="ff_container-formstep-content">
        <xsl:with-param name="data" select="ext:node-set($step-content)"/>
    </xsl:call-template>





</xsl:template>
