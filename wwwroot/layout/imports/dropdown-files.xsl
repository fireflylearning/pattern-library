<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="dropdown-files">
        <form action="" method="post" id="pattern" class="xx-pattern-jump">
            <select name="section" id="pattern-select" class="nav-section-select">
                <option value="">Jump to…</option>
                
                <option value="#ff_module-title">    ff_module-title</option>
                
                <option value="#ff_module-button">    ff_module-button</option>
                
                <option value="#ff_module-button--wide">    ff_module-button--wide</option>
                
            </select>
            <button type="submit" id="pattern-submit" style="display: none;">Go</button>
        </form>
    </xsl:template>
</xsl:stylesheet>
