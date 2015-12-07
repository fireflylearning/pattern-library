<ul class="crate_blocklist">
    {% for block in site.blocks %}

        <li class="crate_blocklist__item"><a href="{{block.info.url}}">{{block.page.title | default(block.info.basename)}}</a></li>

    {% endfor %}
</ul>
