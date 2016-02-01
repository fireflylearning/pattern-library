<ul class="crate_pagelist">
{% for p in pages %}
{% if p.name !== 'index.md' %}
<li class="crate_pagelist__item"><a href="{{p.urlPath}}">{{p.meta.title|default(p.name)}}</a></li>
{% endif %}
{% endfor %}
</ul>
