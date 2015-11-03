<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template name="dropdown-files">
        <form action="" method="post" id="pattern" class="xx-pattern-jump">
            <select name="section" id="pattern-select" class="nav-section-select">
                <option value="">Jump to…</option>
                {% for block in blocklist %}
                <option value="#{{block.basename}}">    {{block.basename}}</option>
                {% endfor %}
            </select>
            <button type="submit" id="pattern-submit" style="display: none;">Go</button>
        </form>
    </xsl:template>
</xsl:stylesheet>
