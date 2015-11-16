<form action="" method="post" id="pattern" class="crate_pattern-jump">
    <select name="section" id="pattern-select" class="nav-section-select">
        <option value="">Jump to…</option>
        {% for block in blocklist %}
        <option value="#{{block.basename}}">    {{block.basename}}</option>
        {% endfor %}
    </select>
    <button type="submit" id="pattern-submit" style="display: none;">Go</button>
</form>
