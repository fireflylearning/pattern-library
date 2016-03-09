---
data:
  message: "This field is invalid"
  active: true
  modifier: "valid"
  classes: "third-party-class-1 third-party-class-2"
  modules:
    - "<span class=\"crate_util-block\">Module</span>"
---

## ff_container-validation

A container that adds a validation layer to anything. It can also be used in standalone mode.

### Active state

Usually, validation is triggered by an event, so you must specifically set the validation into an active state to see any result, by setting `active="true"`.

**Please note:** If you don't specify `active` any message and validation styling will not be shown

### Modifiers

* error (default, if none specified)
* error-standalone
* warning
* warning-standalone
* valid
* valid-standalone

### XML Schema

```
<validation classes="third-party-class-1 third-party-class-2" modifier="warning" active="true">
  <message>Warning: This task description is very short.</message>
  <modules>
    <item>[call other patterns here]</item>
    <item>[call other patterns here]</item>
  </module>
</validation>
```
