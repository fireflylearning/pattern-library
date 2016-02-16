
            {% include '../includes/inline-scripts.xsl' %}
            {% for _block in page.blocks %}
                {% set jsEntry = _block.name|jsEntry %}
                {% set jsUrlPath = _block.name|jsUrlPath %}
                <script src="{{jsUrlPath}}"></script>
                <script>
                    <xsl:text disable-output-escaping="yes" >
                    <![CDATA[
                    if (window.ffBlocks && window.ffBlocks["{{jsEntry}}"]) {
                        console.log("[Including JS] {{jsUrlPath}}");
                        if (typeof(window.ffBlocks["{{jsEntry}}"]) === "function") {
                            window.ffBlocks["{{jsEntry}}"]();
                        }
                    }
                    ]]>
                    </xsl:text>
                </script>
            {% endfor %}
