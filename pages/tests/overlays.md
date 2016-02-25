---
page:
    title: "Overlay container test"
    layout: list-blocks
data:
  -
    ff_container-overlay:
        -
          modifier: "fixed-bottom"
          body:
            - "<xsl:call-template name=\"ff_module-button\"><xsl:with-param name=\"data\"><text>hi</text></xsl:with-param></xsl:call-template>"
          bar:
            - "<span class=\"crate_util-block\">The control bar for the page</span>"
---
