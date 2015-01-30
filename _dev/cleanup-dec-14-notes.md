# Cleanup

* ‘Write blog post’ header is none standard
* RSS 
** Not all have the same type of feed title
** Blog / ticker / etc — should all have a high level ID Class.
* Dashboard admin pages should have an identifier
* Extra links on profile page is none standard
* Blog post main title doesn’t have default styling
* clean up items that have background images for icons rather than  fonts.
* Calendar view has a random <p> tag without any class.
* Timetable’s “today” button need .ff-button
* See more links have french quote marks that needs killing
* All see more links should use same markup.
* Where images are used when css attributes could be used (eg to add a border) — CSS should be used.
* turn off rare used CSS things — so, for example, if there’s an image on a box that we always turn off, just kill it.
* remove ANY inline styles.
* Menus, “explore WHATEVER” -> <span>explore</span>
* In news feeds, images sit in classless <p> tag — this should have a wrapper with a class.
* On blog pages there are two kinds of footers — one for the tags, one for the recommendations — each should have an identifying class.
* <p> tag around “Write new blog post” button — this should be a <div> with a class.
* RSS blog style : Container div around blog tags and blog stories, in RSS component. They’re each in their own <div>’s at the moment, but they should be grouped by a wrapper <div>
* RSS blog style : Each month is shown / hidden via js by looking at each individual entry — could these be wrapped?