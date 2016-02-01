<ul class="crate_blocklist">
{%- for block in blocks %}
    <li class="crate_blocklist__item"><a href="{{block.name|urlPath}}">{{block.meta.title|default(block.name)}}</a></li>
{% endfor -%}
</ul>
