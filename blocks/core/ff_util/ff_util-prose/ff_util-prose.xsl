<xsl:template name="ff_util-prose">
    <xsl:param name="data" />

    <p>ff_util-prose Individual styles</p>
    <div class="ff_module-anything">
        <h1 class="ff_util-prose__panel-heading">Panel Heading</h1>
        <h2 class="ff_util-prose__sub-heading">Subheading</h2>
        <h3 class="ff_util-prose__column-heading">Column heading</h3>
        <h3 class="ff_util-prose__section-heading">Section heading</h3>

        <p class="ff_util-prose__text--big">Big text</p>
        <p class="ff_util-prose__text">Default text</p>
        <p class="ff_util-prose__text--small">Small text</p>

        <p><time class="ff_util-prose__time">Mon 27/07/15 11:00</time></p>
        <p><time class="ff_util-prose__time--supporting">Mon 27/07/15 11:00</time></p>

        <p class="ff_util-prose__left-blank">Left blank</p>
    </div>

    <hr/>
    <p>ff_util-prose Group styles</p>
    <div class="ff_util-prose">
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>

        <h1>Heading 1 <a href="#">with link</a></h1>
        <h2>Heading 2 <a href="#">with link</a></h2>
        <h3>Heading 3 <a href="#">with link</a></h3>
        <h4>Heading 4 <a href="#">with link</a></h4>


        <p>Lorem ipsum dolor sit amet</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut mauris et tortor tincidunt mollis. Quisque maximus, mauris at cursus ornare, tortor eros elementum elit, tincidunt ornare lacus erat ut massa. Curabitur <a href="#">consectetur lectus</a> ac scelerisque dictum. Etiam sollicitudin augue enim, vel interdum nisi ultricies nec.</p>

        <time>Mon 27/07/15 11:00</time>

        <ul>
            <li>Unordered list item a1</li>
            <li>Unordered list item a2 Quisque maximus, mauris at cursus ornare, tortor eros elementum elit, tincidunt ornare lacus erat ut massa.</li>
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

        <dl>
            <dt>Defininion title</dt>
            <dd>Definition data</dd>
            <dd>Definition data</dd>
            <dt>Defininion title</dt>
            <dd>Definition data</dd>
            <dd>Definition data</dd>
        </dl>
    </div>

</xsl:template>
