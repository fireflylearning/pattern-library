<ul class="crate_pagelist">
    {% for page in filelist %}
        <li class="crate_pagelist__item"><a href="{{page.link}}">{{page.title| default(page.basename)}}</a></li>
    {% endfor %}
</ul>
