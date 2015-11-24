<form action="" method="post" id="pattern" class="crate_pattern-jump">
    <select name="section" id="pattern-select" class="nav-section-select">
        <option value="">Jump to…</option>
        {% for block in site.blocks %}
        <option value="#{{block.info.basename}}">    {{block.info.basename}}</option>
        {% endfor %}
    </select>
    <button type="submit" id="pattern-submit" style="display: none;">Go</button>
</form>
