
            {% include '../includes/inline-scripts.xsl' %}
            {% for _block in page.blocks %}
                <script src="{{_block.name|jsUrlPath}}"></script>
                <script>
                    <xsl:text disable-output-escaping="yes" >
                    <![CDATA[
                    if (window.ffBlocks && window.ffBlocks["{{_block.name}}"]) {
                        console.log("{{_block.name}}");
                        if (typeof(window.ffBlocks["{{_block.name}}"]) === "function") {
                            window.ffBlocks["{{_block.name}}"]();
                        }
                    }
                    ]]>
                    </xsl:text>
                </script>
            {% endfor %}
