---
data:
  - 
    href: "#"
    label: "Mathematics"
    from: "Terry Teacher"
    from_href: "#"
    date: "07/04/2015 at 17:52"
    path: "Subjects > Upper School"
    meta: "Recommended"
---

# Bookmark

## Notes

* `from` and `from_href` are optional. 
* The `meta` attribute allows you to pass full-text, it's always placed ahead of `from` and `date`
* the `from` attribute is auto-prepended with "by "
* the `date` attribute is auto-prepended with "on "

## XML to call this module:

**Example recommened bookmark**

```
<bookmark href="#" from="Terry Teacher" from-href="#" date="Last Thursday at 11:44" meta="Recommended" path="Section > to > the > bookmark">
    <label>Page title</label>
</bookmark>
```

**Example personal bookmark**

```
<bookmark href="#" date="Last Thursday at 11:44" meta="Bookmarked" path="Section > to > the > bookmark">
    <label>Page title</label>
</bookmark>
```

**Example recommended to class**

```
<bookmark href="#" date="Last Thursday at 11:44" meta="Recommeded to this class" path="Section > to > the > bookmark">
    <label>Page title</label>
</bookmark>
```