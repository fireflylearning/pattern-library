<xsl:template name="ff_util-prose">
    <xsl:param name="data" />

    <div class="ff_util-prose">
        <h1>Heading 1</h1>
        <h2>Heading 2 </h2>
        <p>Lorem ipsum dolor sit amet</p>
        <ul>
            <li>Unordered list item a1</li>
            <li>Unordered list item a2</li>
            <li>Unordered list item a3</li>
            <li>Unordered list item parent a
                <ul>
                    <li>Unordered list item b1</li>
                    <li>Unordered list item b2</li>
                    <li>Unordered list item b3</li>
                    <li>Unordered list item parent b
                        <ul>
                        <li>Unordered list item c1</li>
                        <li>Unordered list item c2</li>
                        <li>Unordered list item c3</li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>

        <ol>
            <li>Ordered list item a1</li>
            <li>Ordered list item a2</li>
            <li>Ordered list item a3</li>
            <li>Ordered list item parent a
                <ol>
                    <li>Ordered list item b1</li>
                    <li>Ordered list item b2</li>
                    <li>Ordered list item b3</li>
                    <li>Ordered list item parent b
                        <ol>
                        <li>Ordered list item c1</li>
                        <li>Ordered list item c2</li>
                        <li>Ordered list item c3</li>
                        </ol>
                    </li>
                </ol>
            </li>
        </ol>
    </div>

</xsl:template>
