<ul class="crate_contentlist">
    {% for content in site.pages %}
        {% if content.info.basename !== 'index' %}
        <li class="crate_contentlist__item"><a href="{{content.info.url}}">{{content.page.title | default(content.info.basename)}}</a></li>
        {% endif %}
    {% endfor %}
</ul>
