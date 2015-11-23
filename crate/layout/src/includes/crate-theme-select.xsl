<form action="" method="post" id="crate_theme-form" class="crate_theme-select">
    <select name="section" id="theme-select" class="nav-section-select">
        <option value="">Select theme…</option>
        {% for theme in themes %}
        <option value="{{theme.filepath}}">    {{theme.name}}</option>
        {% endfor %}
    </select>
    <button type="submit" id="theme-submit" style="display: none;">Go</button>
</form>
