{% for block in blocks %}
{% set p = '../../../../' + block.info.basepath + '.xsl' %}
{% include p %}
{% endfor %}
