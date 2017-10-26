<xsl:template name="ff_module-form-completed">
    <xsl:param name="data" />

    <div class="ff_module-form-completed">

      <xsl:choose>
        <xsl:when test="$data/form-completed/@image = 'draft'">
          <svg class="ff_module-form-completed__image" viewBox="0 0 100 120" width="120" height="120">
            <g fill="none" stroke="#EDEDED" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" id="ff_module-form-completed__image--draft-page">
              <path d="M4 86.3V29L28 4.7h62c3.4 0 6 2.7 6 6v76.4"/>
              <path d="M4 32h27V4.7"/>
            </g>
            <circle id="ff_module-form-completed__image--draft-circle" cx="50" cy="87.2" r="30" fill="#C8E1B9"/>
            <path id="ff_module-form-completed__image--draft-tick" fill="none" stroke="#FFF" stroke-width="6.7" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M37.8 87.2l9 9 16.7-16.8"/>
          </svg>
        </xsl:when>
        <xsl:when test="$data/form-completed/@image = 'deleted'">
          <svg class="ff_module-form-completed__image" viewBox="0 0 70 70" width="70" height="70">
            <path d="M30.05 35.5l-8.48 8.48c-1.38 1.38-1.37 3.6 0 4.96 1.36 1.36 3.58 1.36 4.95 0l8.48-8.5 8.48 8.5c1.37 1.36 3.6 1.36 4.96 0 1.36-1.37 1.37-3.58 0-4.96l-8.5-8.48 8.5-8.48c1.37-1.38 1.36-3.6 0-4.96-1.37-1.36-3.6-1.36-4.96 0L35 30.57l-8.48-8.5c-1.37-1.36-3.6-1.36-4.96 0-1.36 1.37-1.37 3.58 0 4.96l8.5 8.48zM35 70c19.33 0 35-15.67 35-35S54.33 0 35 0 0 15.67 0 35s15.67 35 35 35z" fill="#F8ADAD" fill-rule="evenodd"/>
          </svg>
        </xsl:when>
        <xsl:otherwise>
          <svg class="ff_module-form-completed__image" viewBox="0 0 70 70" width="70" height="70">
            <circle id="ff_module-form-completed__image--circle" fill="#C8E1B9" cx="35" cy="35" r="35" x="0" y="0"/>
            <polyline id="ff_module-form-completed__image--tick" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" points="21.75 34.598 32.185 45.033 51.75 25.467"/>
          </svg>
        </xsl:otherwise>
      </xsl:choose>

      <div class="ff_module-form-completed__meta">
        <xsl:if test="$data/form-completed/@title">
          <h2 class="ff_module-form-completed__title"><xsl:value-of select="$data/form-completed/@title"/></h2>
        </xsl:if>
        <xsl:if test="$data/form-completed/@message">
          <p class="ff_module-form-completed__message"><xsl:value-of select="$data/form-completed/@message"/></p>
        </xsl:if>
      </div>
      <xsl:if test="$data/form-completed/block">
        <div class="ff_module-form-completed__actions">
          <xsl:for-each select="$data/form-completed/block">
            <xsl:call-template name="ff_module-button">
                <xsl:with-param name="data" select="."/>
            </xsl:call-template>
          </xsl:for-each>
        </div>
      </xsl:if>
    </div>
</xsl:template>
