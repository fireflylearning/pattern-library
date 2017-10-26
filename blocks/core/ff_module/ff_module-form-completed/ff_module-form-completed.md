---
data:
  -
    title: "All Done!"
    message: "The task has been set to Class En/3a and is due on Tuesday 13th September 2016"
    image: deleted
    buttons:
      -
        text: "Set Another Task"
        modifier: primary
        href: "#"
      -
        text: "View the Task"
        modifier: tertiary
        href: "#"
      -
        text: "Back to Dashboard"
        modifier: tertiary
        href: "#"
requires: ff_module-button
---

Renders a form completed screen.

Params (all are optional for maximum flexibility):

* `title` [string]
* `message` [string]
* `image` [string]
  * `default` (default, if none provided)
  * `draft`
  * `deleted`
* buttons [object, see `ff_module-button`]
