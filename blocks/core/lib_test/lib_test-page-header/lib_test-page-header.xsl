<xsl:template name="lib_test-page-header">
<xsl:param name="data" />

    <div class="ff_container-page-header">

        <h1 class="ff_container-page-header__title">
            Add a task
        </h1>

        <div class="ff_container-page-header__controls">
            <xsl:call-template name="ff_module-formsteps">
                <xsl:with-param name="data" select="ext:node-set($data)"/>
            </xsl:call-template>
        </div>

    </div>

    <div class="ff_container-page">
        <h2 class="ff-post">Select recipients</h2>
        <!-- FIXME: Remove and create own pattern after BETT -->
        <div class="ff-no-recipients-message" style="display: block;">
          <p>Please add one or more recipients</p>
        </div>
        <!-- /FIXME: Remove and create own pattern after BETT -->
    </div>
</xsl:template>
