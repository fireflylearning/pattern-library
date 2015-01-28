<? require_once '_htmlhead.php'; ?>
  	
  	<h2>ff-button (as link)</h2>
  	<div class="pattern">
    	<a href="#" class="ff-button ff-button-addcomment ff-button-primary"><span>Add a comment</span></a>
  	</div>
  	
  	<h2>ff-button (as button)</h2>
  	<div class="pattern">
    	<button class="ff-button ff-button-addcomment ff-button-primary ff-icon ff-icon-comment-add"><span>Add a comment</span></button>
  	</div>
  	
  	<h2>ff-nav-switch</h2>
  	<div class="pattern">
    	<div class="ff-nav-switch">
      	<p class="ff-nav-switch-label">Show</p>
        <ul class="ff-nav-switch-items">
          <li class="unselected"><a href="#">This Week</a></li>
          <li class="selected ff-icon ff-icon-selected"><span>Next Week</span></li>
          <li class="unselected"><a href="#">Two weeks time</a></li>
        </ul>
      </div>
  	</div>
  	
  	<h2>ff-dropdown</h2>
  	<div class="pattern">
    	<ul class="ff-dropdown ff-button ff-button-dropdown ff-button-bookmark">
        <li class="ff-icon ff-icon-bookmark ff-icon-dropdown"><span class="ff-dropdown-label">Bookmark</span>
          <ul class="ff-dropdown-items">
            <li class="ff-button-unbookmark-page"><a href="#"><span>UnBookmark Page</span></a></li>
            <li class="ff-button-recommend-page"><a href="#"><span>Recommend Page</span></a></li>
          </ul>
        </li>
      </ul>
  	</div>
  	
  	<h2>ff-button-with-dropdown</h2>
  	<div class="pattern">
    	<div class="ff-button-with-dropdown">
      	<a href="#" class="ff-button ff-button-add ff-primary-action ff-icon ff-icon-task-add"><span>Set a New Task</span></a>
      	<ul class="ff-dropdown ff-button ff-button-dropdown ff-secondary-actions">
          <li class="ff-icon-dropdown"><span class="ff-dropdown-label">More Options</span>
            <ul class="ff-dropdown-items ff-secondary-actions-dropdown">
              <li><a href="#" class="ff-icon ff-icon-archive"><span>Bulk Archive</span></a></li>
            </ul>
          </li>
        </ul>
    	</div>
  	</div>
  	
  	<h2>ff-actions (wrapper)</h2>
  	<div class="pattern">
    	<div class="ff-actions pagetoolsbtns ff-page-actions">
    	  <div class="ff-actions-primary">
    	    <button class="ff-button collapsible ff-button-comment" title="Add a public comment to this page"><span>Add comment</span></button>
    	  </div>
    	  <div class="ff-actions-secondary">
          <ul class="ff-dropdown ff-button ff-button-dropdown ff-button-bookmark">
            <li class="ff-icon ff-icon-bookmark ff-icon-dropdown"><span class="ff-dropdown-label">Bookmark</span>
              <ul class="ff-dropdown-items">
                <li class="ff-button-unbookmark-page"><a href="#"><span>UnBookmark Page</span></a></li>
                <li class="ff-button-recommend-page"><a href="#"><span>Recommend Page</span></a></li>
              </ul>
            </li>
          </ul>
          <ul class="ff-dropdown ff-button ff-button-dropdown ff-button-bookmark">
            <li class="ff-icon ff-icon-bookmark ff-icon-dropdown"><span class="ff-dropdown-label">Bookmark</span>
              <ul class="ff-dropdown-items">
                <li class="ff-button-unbookmark-page"><a href="#"><span>UnBookmark Page</span></a></li>
                <li class="ff-button-recommend-page"><a href="#"><span>Recommend Page</span></a></li>
              </ul>
            </li>
          </ul>
      	</div>
    	</div>
  	</div>
  	
  	<h2>ff-actions with title (wrapper)</h2>
  	<div class="pattern">
    	<div class="ff-actions pagetoolsbtns ff-page-actions">
    	  <div class="ff-actions-primary ff-actions-title">
    	    <span>You have <strong>10</strong> tasks to manage</span>
    	  </div>
    	  <div class="ff-actions-secondary">
          <div class="ff-button-with-dropdown">
          	<a href="#" class="ff-button ff-button-add ff-primary-action ff-icon ff-icon-task-add"><span>Set a New Task</span></a>
          	<ul class="ff-dropdown ff-button ff-button-dropdown ff-secondary-actions">
              <li class="ff-icon-dropdown"><span class="ff-dropdown-label">More Options</span>
                <ul class="ff-dropdown-items ff-secondary-actions-dropdown">
                  <li><a href="#" class="ff-icon ff-icon-archive"><span>Bulk Archive</span></a></li>
                </ul>
              </li>
            </ul>
        	</div>
      	</div>
    	</div>
  	</div>
  	
  	<h2>ff-actions with heading (h2) (wrapper)</h2>
  	<div class="pattern">
    	<div class="ff-actions pagetoolsbtns ff-page-actions">
    	  <div class="ff-actions-primary ff-actions-title">
    	    <h2>Your Bookmarks</h2>
    	  </div>
    	  <div class="ff-actions-secondary">
          <div class="ff-button-with-dropdown">
          	<a href="#" class="ff-button ff-button-add ff-primary-action ff-icon ff-icon-task-add"><span>Set a New Task</span></a>
          	<ul class="ff-dropdown ff-button ff-button-dropdown ff-secondary-actions">
              <li class="ff-icon-dropdown"><span class="ff-dropdown-label">More Options</span>
                <ul class="ff-dropdown-items ff-secondary-actions-dropdown">
                  <li><a href="#" class="ff-icon ff-icon-archive"><span>Bulk Archive</span></a></li>
                </ul>
              </li>
            </ul>
        	</div>
      	</div>
    	</div>
  	</div>
  	
  	<h2>ff-nav-filter</h2>
  	<div class="pattern">
    	<div class="ff-nav-filter">
        <ul>
          <li class="ff-nav-group selected"><a class="ff-nav-group-header" href="#"><span>Filter by Status</span></a><div class="ff-nav-group-items" style="display: block;">
              <ul>
                <li class="selected"><a><span>Active</span></a></li>
                <li><a href="#"><span>Require Marking</span></a></li>
                <li><a href="#"><span>Archive</span></a></li>
              </ul>
            </div>
          </li>
          <li class="ff-nav-group"><a class="ff-nav-group-header" href="#"><span>Filter by Group</span></a><div class="ff-nav-group-items" style="display: none;">
              <ul>
                <li class="selected"><a href="#"><span>All Groups</span></a></li>
                <li><a href="#"><span>Administrators</span></a></li>
                <li><a href="#"><span>Year 3</span></a></li>
                <li><a href="#"><span>Year 4</span></a></li>
                <li><a href="#"><span>Year 5</span></a></li>
              </ul>
            </div>
          </li>
          <li class="ff-nav-group"><a class="ff-nav-group-header" href="#"><span>Filter by Date</span></a><div class="ff-nav-group-items" style="display: none;">
              <ul>
                <li class="selected"><a><span>All</span></a></li>
                <li><a href="#"><span>Last week</span></a></li>
                <li><a href="#"><span>Last fortnight</span></a></li>
                <li><a href="#"><span>Last month</span></a></li>
                <li><a href="#"><span>Last three months</span></a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>	
  	</div>
  	
  	
  	<h2>ff-links-list</h2>
  	<div class="pattern">
	  	<div class="ff-links-list">
		  	<h4 class="ff-links-list-title">Newest Recommended</h4>
		  	<ul>
			  	<li><a href="#">Physics > Planets</a></li>
			  	<li><a href="#">Biology > Selective Membranes</a></li>
			  	<li><a href="#">After School Clubs > Rowing Club Summer Schedule 2015</a></li>
		  	</ul>
		  	<h4 class="ff-links-list-title">My Bookmarks</h4>
		  	<ul>
			  	<li><a href="#">Physics > Planets</a></li>
			  	<li><a href="#">Biology > Selective Membranes</a></li>
			  	<li><a href="#">After School Clubs > Rowing Club Summer Schedule 2015</a></li>
		  	</ul>
	  	</div>
  	</div>
  	
  	<h2>ff-links-list with actions & form</h2>
  	<div class="pattern">
	  	<div class="ff-links-list">
		  	<ul>
			  	<li><a href="#">Planets of the Solar System</a><div class="ff-links-list-actions"><a href="#">Rename</a></div></li>
			  	<li>
			  		<form class="ff-form ff-links-list-form">
				  		<input type="text" value="X Planets"/>
				  		<div class="ff-links-list-actions">
					  		<button type="submit">Update</button>
				  		</div>
			  		</form>
			  	</li>
			  	<li><a href="#">The Atmosphere on Mars</a><div class="ff-links-list-actions"><a href="#">Rename</a></div></li>
		  	</ul>
	  	</div>
  	</div>
  	
  	<h2>ff-links-list reordering</h2>
  	<div class="pattern">
	  	<div class="ff-links-list ff-links-list-reordering">
		  	<span class="ff-links-list-instructions"><em>Drag and Drop your bookmarks into your preferred order.</em></span>
		  	<ul>
			  	<li><a href="#">Planets of the Solar System</a><div class="ff-links-list-actions"><a href="#">Delete</a></div></li>
			  	<li><a href="#">X Planets</a><div class="ff-links-list-actions"><a href="#">Delete</a></div></li>
			  	<li class="ff-links-list-droptarget"></li>
			  	<li><a href="#">The Atmosphere on Mars</a><div class="ff-links-list-actions"><a href="#">Delete</a></div></li>
		  	</ul>
	  	</div>
  	</div>
  	
  	<h2>ff-filter</h2>
  	<div class="pattern">
	  	<div class="ff-filter">
		  	<form name="bookmarksform" class="ff-form" method="GET">
			  	<label for="group">Recommended to:</label>
			  	<select name="group">
				  	<option value="">All Groups</option>
				</select>
				<label for="sort">Sort by:</label>
				<select name="sort" onchange="this.form.submit()">
					<option value="">Newest</option>
                    <option value="visited">Last Visited</option>
                    <option value="popular">Most Popular</option>
                </select>
            </form>
	  	</div>
  	</div>
  	
  	<h2>ff-navigation</h2>
  	<div class="pattern">
	  	<ul class="ff-navigation">
		  	<li><a href="#" class="ff-icon ff-icon-archive">Archive</a></li>
		  	<li><a href="#" class="ff-icon ff-icon-tick">Mark</a></li>
		  	<li><a href="#" class="ff-icon ff-icon-link">See all</a></li>
	  	</ul>
  	</div>
  	
  	<h2>ff-pagination</h2>
  	<div class="pattern">
	  	<ol class="ff-pagination">
          <li class="ff-pagination-previous ff-pagination-disabled"><a href="#" class="ff-icon ff-icon-arrow-left"><span>Previous</span></a></li>
		  <li><a href="#">1</a></li>
          <li class="ff-pagination-current-page"><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li class="ff-pagination-skip"><span>&hellip;</span></li>
          <li><a href="#">47</a></li>
          <li><a href="#">48</a></li>
          <li><a href="#">49</a></li>
          <li class="ff-pagination-next"><a href="#" class="ff-icon-after ff-icon-arrow-right"><span>Next</span></a></li>
        </ol>
  	</div>
  	
  	<h2>ff-heading</h2>
  	<div class="pattern">
	  	<div class="ff-heading">
		  	<h1>Page Heading</h1>
	  	</div>
  	</div>
  	
  	<h2>ff-tags</h2>
  	<div class="pattern">
	  	<ul class="ff-tags">
		  	<li class="ff-tag"><span class="ff-tag-detail">Class 8x/En2</span><a href="#" class="ff-tag-remove ff-icon ff-icon-close"><span>Remove</span></a></li>
		  	<li class="ff-tag"><span class="ff-tag-detail">Juan Jardino</span><a href="#" class="ff-tag-remove ff-icon ff-icon-close"><span>Remove</span></a></li>
		  	<li class="ff-tag"><span class="ff-tag-detail">Class President "Edo"</span></li>
	  	</ul>
  	</div>
  	
  	<h2>ff-post-footer (wrapper)</h2>
  	<div class="pattern">
	  	<div class="ff-post-footer">
		  	<span class="ff-post-footer-message"><strong>Recommend to:</strong></span>
		  	<ul class="ff-tags">
			  	<li class="ff-tag"><span class="ff-tag-detail">Class 8x/En2</span><a href="#" class="ff-tag-remove ff-icon ff-icon-close"><span>Remove</span></a></li>
			  	<li class="ff-tag"><span class="ff-tag-detail">Juan Jardino</span><a href="#" class="ff-tag-remove ff-icon ff-icon-close"><span>Remove</span></a></li>
			  	<li class="ff-tag"><span class="ff-tag-detail">Class President "Edo"</span></li>
		  	</ul>
		  	<a class="ff-post-footer-action" href="#">Add Another</a>
	  	</div>
  	</div>
  	
  	
  	<h2>ff-interface-form</h2>
  	<div class="pattern">
	  	<form class="ff-interface-form">
		  	<fieldset>
			  	<label for="uniqueId1">Type your comment</label>
			  	<textarea name="uniqueId1"></textarea>
		  	</fieldset>
		  	
		  	<div class="ff-actions">
		  		<button class="ff-button ff-button-primary">Add your comment</button>
		  	</div>
		  	
	  	</form>
  	</div>
  	
  	<h2>ff-dashboard-panel</h2>
  	<div class="pattern">
    	
    	<div class="ff-dashboard-panel ff-dashboard-panel-posts">
        <div class="ff-dashboard-panel-header">
          <h3 class="ff-dashboard-component-heading"><span>Announcements &amp; Messages</span></h3>
          <div class="ff-dashboard-panel-actions">
            <a href="#" class="ff-button ff-button-addcomment ff-button-primary"><span>Add a comment</span></a>
          </div>
        </div>
        <div class="ff-dashboard-panel-body">
          
        </div>
        <div class="ff-dashboard-panel-more">
          <p class="ff-see-more"><a href="#">View All Posts, Announcements &amp; Messages</a></p>
        </div>
      </div>
    	
  	</div>
  	
  	<h2>ff-messages</h2>
  	<div class="pattern">
	  	<ol class="ff-messages">
			<li class="ff-message-notice ff-msg">
				<div class="ff-message-content ff-message-important">
					<div class="ff-message-text">
						<p>This is an important message</p>
						<ul class="ff-message-attachments"></ul>
					</div>
					<div>
						<p class="ff-message-meta">Added 10/11/2014 at 09:33</p>
					</div>
					<a href="http://firefly5/dashboard-1#" class="ff-message-close ff-icon ff-icon-close" title="Archive"><span>Archive</span></a>
				</div>
			</li>
			<li class="ff-message-notice ff-msg">
				<div class="ff-message-content">
					<div class="ff-message-text">
						<p>This isn't so important</p>
						<ul class="ff-message-attachments"></ul>
					</div>
					<div>
						<p class="ff-message-meta">Added 10/11/2014 at 09:33</p>
					</div>
					<a href="http://firefly5/dashboard-1#" class="ff-message-close ff-icon ff-icon-close" title="Archive"><span>Archive</span></a>
				</div>
			</li>
      </ol>
  	</div>
  	
  	<h2>ff-messages for comments</h2>
  	<div class="pattern">
	  	<ol class="ff-comments ff-messages">
            <li class="ff-comment">
              <div class="ff-comment-wrapper">
                <div class="ff-comment-content">
                  <div class="ff-comment-text">
                    <p><a href="#">A reply to a reply</a></p>
                  </div>
                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Administrator</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span> in <a href="#" class="ff-comment-meta-location">Art</a></p>
                </div>
              </div>
              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
            </li>
            <li class="ff-comment">
              <div class="ff-comment-wrapper">
                <div class="ff-comment-content">
                  <div class="ff-comment-text">
                    <p><a href="#">A reply to a reply</a></p>
                  </div>
                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Administrator</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span> in <a href="#" class="ff-comment-meta-location">Art</a></p>
                </div>
              </div>
              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
            </li>
          </ol>
  	</div>
  	
  	<h2>ff-messages for comments with replies & navigation</h2>
  	<div class="pattern">
	  	<ol class="ff-comments ff-messages">
		  	<li class="ff-comment">
              <div class="ff-comment-wrapper">
                <div class="ff-comment-content">
                  <div class="ff-comment-text">
                    <p>The original comment.</p>
                  </div>
                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Peter Pupil</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span></p>
                  <ul class="ff-navigation">
					<li><a href="#" class="">Reply</a></li>
					<li><a href="#" class="">Edit</a></li>
					<li><a href="#" class="">Delete</a></li>
				</ul>
                </div>
              </div>
              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
            </li>
            
            <li class="ff-comment">
              <div class="ff-comment-wrapper">
                <div class="ff-comment-content">
                  <div class="ff-comment-text">
                    <p>The original comment.</p>
                  </div>
                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Peter Pupil</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span></p>
                  <form class="ff-interface-form ff-comment-form">
	                  <fieldset>
	                  	<textarea></textarea>
	                  </fieldset>
	                  <div class="ff-actions">
		                  <div class="ff-actions-primary">
		                  	<button class="ff-button ff-button-primary">Reply</button>
						  	<a class="ff-button">Cancel</a>
		                  </div>	
	                  </div>
                  </form>
                </div>
              </div>
              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
              
              <ol class="ff-comment-replies">
	              <li class="ff-comment">
		              <div class="ff-comment-wrapper">
		                <div class="ff-comment-content">
		                  <div class="ff-comment-text">
		                    <p>This is a reply to the original comment.</p>
		                  </div>
		                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Sally Student</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span></p>
		                </div>
		              </div>
		              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
		              <ol class="ff-comment-replies">
			              <li class="ff-comment">
				              <div class="ff-comment-wrapper">
				                <div class="ff-comment-content">
				                  <div class="ff-comment-text">
				                    <p>This is a reply to the reply.</p>
				                  </div>
				                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Peter Pupil</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span></p>
				                  <ul class="ff-navigation">
									<li><a href="#" class="">Reply</a></li>
									<li><a href="#" class="">Edit</a></li>
									<li><a href="#" class="">Delete</a></li>
								</ul>
				                </div>
				              </div>
				              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
				            </li>
		              </ol>
		            </li>
		            <li class="ff-comment">
		              <div class="ff-comment-wrapper">
		                <div class="ff-comment-content">
		                  <div class="ff-comment-text">
		                    <p>This is another reply to the original comment.</p>
		                  </div>
		                  <p class="ff-comment-meta">Posted by <a href="#" class="ff-comment-meta-author">Terry Teacher</a>, <span class="ff-comment-meta-date">10/11/2014</span> at <span class="ff-comment-meta-time">09:38</span></p>
		                </div>
		              </div>
		              <div class="ff-comment-avatar"><img src="images/person.jpg" class="ff-avatar"></div>
		            </li>
              </ol>
              
            </li>
            
	  	</ol>
  	</div>
  	
  	
  	
  	<h2>ff-messages for tasks</h2>
  	<div class="pattern">
	  	<ol class="ff-messages">
	        <li class="ff-message-notice ff-task ff-offline ff-color-red">
	          <div class="ff-message-content">
	            <div class="ff-message-text">
	              <p>Offline task</p>
	              <ul class="ff-message-attachments"></ul>
	            </div>
	            <div class="ff-checkbox"><a class="ff-button ff-button-checkbox ff-action-markasdone"><span>Mark as Done</span></a></div>
	            <div class="ff-message-meta-and-labels">
	              <p class="ff-message-meta"><span class="ff-label ff-label-overdue" title="Due 03/12/2014">Overdue</span> Posted by <a href="#">Administrator</a> to <strong>Administrators</strong>, 31/03/2014 at 14:09</p>
	              <ul class="ff-labels-color">
	                <li class="ff-label-color-grey"><a href="">Gray</a></li>
	                <li class="ff-label-color-red ff-selected"><a href="">Red</a></li>
	                <li class="ff-label-color-blue"><a href="">Blue</a></li>
	                <li class="ff-label-color-yellow"><a href="">Yellow</a></li>
	                <li class="ff-label-color-green"><a href="">Green</a></li>
	                <li class="ff-label-color-orange"><a href="">Orange</a></li>
	                <li class="ff-label-color-pink"><a href="">Pink</a></li>
	                <li class="ff-label-color-purple"><a href="">Purple</a></li>
	                <li class="ff-label-color-empty"><a href="">NoColour</a></li>
	              </ul>
	            </div>
	          </div>
	        </li>
	        <li class="ff-message-notice ff-task ff-offline">
	          <div class="ff-message-content">
	            <div class="ff-message-text">
	              <p>Personal Task</p>
	              <ul class="ff-message-attachments"></ul>
	            </div>
	            <div class="ff-checkbox"><a class="ff-button ff-button-checkbox ff-action-markasdone"><span>Mark as Done</span></a></div>
	            <div class="ff-message-meta-and-labels">
	              <p class="ff-message-meta">Personal Task, Added 10/01/2014 at 12:47</p>
	              <ul class="ff-labels-color">
	                <li class="ff-label-color-grey"><a href="">Gray</a></li>
	                <li class="ff-label-color-red"><a href="">Red</a></li>
	                <li class="ff-label-color-blue"><a href="">Blue</a></li>
	                <li class="ff-label-color-yellow"><a href="">Yellow</a></li>
	                <li class="ff-label-color-green"><a href="">Green</a></li>
	                <li class="ff-label-color-orange"><a href="">Orange</a></li>
	                <li class="ff-label-color-pink"><a href="">Pink</a></li>
	                <li class="ff-label-color-purple"><a href="">Purple</a></li>
	                <li class="ff-label-color-empty ff-selected"><a href="">NoColour</a></li>
	              </ul>
	            </div>
	          </div>
	        </li>
	        <li class="ff-message-notice ff-task ff-online ff-color-empty">
	          <div class="ff-message-content">
	            <div class="ff-message-text">
	              <p><a href="#">Online Task</a></p>
	              <ul class="ff-message-attachments">
	                	<li class="ff-message-attachment-file"><a href="resource.aspx?id=2671" class="ff-icon ff-icon-file">0104 Firefly-s-w125-h125-q75-m1415912984.jpg</a></li>
	               </ul>
	            </div>
	            <div class="ff-checkbox"><a class="ff-button ff-button-mark ff-button-submitwork" href="/complete-this"><span>Submit Work</span></a></div>
	            <div class="ff-message-meta-and-labels">
	              <p class="ff-message-meta"><span class="ff-label ff-label-new" title="Due 03/12/2014">Just Added</span> Added 31/03/2014 at 17:15</p>
	              <ul class="ff-labels-color">
	                <li class="ff-label-color-grey"><a href="">Gray</a></li>
	                <li class="ff-label-color-red"><a href="">Red</a></li>
	                <li class="ff-label-color-blue"><a href="">Blue</a></li>
	                <li class="ff-label-color-yellow"><a href="">Yellow</a></li>
	                <li class="ff-label-color-green"><a href="">Green</a></li>
	                <li class="ff-label-color-orange"><a href="">Orange</a></li>
	                <li class="ff-label-color-pink"><a href="">Pink</a></li>
	                <li class="ff-label-color-purple"><a href="">Purple</a></li>
	                <li class="ff-label-color-empty ff-selected"><a href="">NoColour</a></li>
	              </ul>
	            </div>
	          </div>
	        </li>

	      </ol>
  	</div>
  	
  	<h2>ff-messages for managing set tasks</h2>
  	<div class="pattern">
	  	<ol class="ff-messages">
		  	<li id="ff-notice-45" data-ff-id="45" data-ff-dashboard-postback="/messages/45" class="ff-message-notice ff-task ff-online">
              <div class="ff-message-content">
                <div class="ff-message-text">
                  <p><a href="#">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas</a></p>
                </div>
                <div class="ff-progress">
                  <p>Progress</p>
                  <div class="ff-progress-bar"><span class="ff-progress-completed" style="width:100%"></span><span class="ff-progress-marked" style="width:80%"></span></div>
                  <p>1 Handed in, 5 Total</p>
                </div>
                <div>
                  <p class="ff-message-meta"></p>
                </div>
              </div>
            </li>
	  	</ol>
  	</div>
  	
  	
  	<h2>ff-messages for marks &amp; feedback</h2>
  	<div class="pattern">
	  	<ol class="ff-messages">
	        <li id="ffMark43" data-ff-dashboard-postback="/feedback/43" class="ff-result ff-result-mark">
	          <div class="ff-message-content">
	            <div class="ff-message-result">
	              <p>100%</p>
	            </div>
	            <p class="ff-message-meta"><a href="/profile?guid=d558dd63fa446347ac8967da4bbcfa01">Administrator</a> THIS now, submitted 22/09/2014 at 12:45</p>
	            <div class="ff-message-text">
	              <p><a href="http://firefly5/this-now?showtest=d558dd63fa446347ac8967da4bbcfa01">Mark</a></p>
	            </div>
	            <a href="#" class="ff-message-close ff-action-markasdoneundo ff-icon ff-icon-close" title="Archive"><span>Archive</span></a></div>
	        </li>
	        <li id="ffMark42" data-ff-dashboard-postback="/feedback/42" class="ff-result">
	          <div class="ff-message-content">
	            <p class="ff-message-meta"><a href="/profile?guid=d558dd63fa446347ac8967da4bbcfa01">Administrator</a> DO this NOW, submitted 22/09/2014 at 12:44</p>
	            <div class="ff-message-text">
	              <p><a href="http://firefly5/do-this-now?showtest=d558dd63fa446347ac8967da4bbcfa01">No marks or feedback</a></p>
	            </div>
	            <a href="#" class="ff-message-close ff-action-markasdoneundo ff-icon ff-icon-close" title="Archive"><span>Archive</span></a></div>
	        </li>
	        <li id="ffMark41" data-ff-dashboard-postback="/feedback/41" class="ff-result ff-result-grade">
	          <div class="ff-message-content">
	            <div class="ff-message-result">
	              <p>A</p>
	            </div>
	            <p class="ff-message-meta"><a href="/profile?guid=d558dd63fa446347ac8967da4bbcfa01">Administrator</a> Do this homework, submitted 22/09/2014 at 12:42</p>
	            <div class="ff-message-text">
	              <p><a href="http://firefly5/do-this-homework?showtest=d558dd63fa446347ac8967da4bbcfa01">Grade</a></p>
	            </div>
	            <a href="#" class="ff-message-close ff-action-markasdoneundo ff-icon ff-icon-close" title="Archive"><span>Archive</span></a></div>
	        </li>
	    </ol>
  	</div>
  	
  	<h2>ff-label</h2>
  	<div class="pattern">
	  	<p><span class="ff-label ff-label-overdue">ff-label-overdue</span> <span class="ff-label ff-label-new">ff-label-new</span></p>
  	</div>
  	
  	<h2>ff-progress</h2>
  	<div class="pattern">
	  	<div class="ff-progress">
          <p class="ff-progress-label-title">Progress</p>
          <div class="ff-progress-bar"><span class="ff-progress-completed" style="width:100%"></span><span class="ff-progress-marked" style="width:80%"></span></div>
          <p class="ff-progress-label-totals">8 Marked, 10 Handed In, 10 Total</p>
        </div>
  	</div>
  	
  	<h2>ff-progress.ff-progress-status</h2>
  	<div class="pattern">
	  	<div class="ff-progress ff-progress-status">
	        <p class="ff-progress-status-waiting ff-progress-status-message">Sally Student has <strong>not completed</strong> this task</p> 
			<div class="ff-actions">
				<div class="ff-actions-primary">
					<ul class="ff-navigation">
						<li><a href="#" class="ff-icon ff-icon-clock">Send Reminder</a></li>
						<li><a href="#" class="ff-icon ff-icon-cross">Excuse</a></li>
					</ul>
				</div>
			</div>
	  	</div>
	  	<div class="ff-progress ff-progress-status">
	        <p class="ff-progress-status-complete ff-progress-status-message">Sally Student has <strong>completed</strong> this task</p> 
			
			<div class="ff-actions">
				<div class="ff-actions-primary">
					<ul class="ff-navigation">
						<li>Awaiting Marks &amp; Feedback</li>
					</ul>
				</div>
			</div>
	  	</div>
	  	
	  	<div class="ff-progress ff-progress-status">
	        <p class="ff-progress-status-complete ff-progress-status-message">Sally Student has <strong>completed</strong> this task</p> 
			
			<div class="ff-actions">
				<div class="ff-actions-primary">
					<ul class="ff-navigation">
						<li><a href="#" class="ff-icon ff-icon-tasks">Send Marks &amp; Feedback</a></li>
					</ul>
				</div>
			</div>
	  	</div>
	  	
  	</div>
  	
  	<h2>ff-avatar</h2>
  	<div class="pattern">
	  	<img src="images/person.jpg" class="ff-avatar"/>
  	</div>
  	
  	<h2>ff-users</h2>
  	<div class="pattern">
	  	<ul class="ff-users">
        	<li><a href="#"><img src="images/group.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Administrators</span></a></li>
        	<li><a href="#"><img src="images/group.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Teachers</span></a></li>
        	<li><a href="#"><img src="images/group.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Swimming Team</span></a></li>
      </ul>
  	</div>
  	
  	<h2>ff-group-listing</h2>
  	<div class="pattern">
	  	<div class="ff-group-listing">
		  	<h2 class="ff-group-listing-title">Group Members</h2>
		  	<ul class="ff-users">
	        	<li><a href="#"><img src="images/person.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Timmy Anderson</span></a></li>
	        	<li><a href="#"><img src="images/person.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Barry Ball</span></a></li>
	        	<li><a href="#"><img src="images/person.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Stacy Cat</span></a></li>
	        	<li><a href="#"><img src="images/person.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Amzer Drigrto</span></a></li>
	        	<li><a href="#"><img src="images/person.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Simone Ephone</span></a></li>
	        	<li><a href="#"><img src="images/person.jpg" class="ff-users-photo ff-avatar"/><span class="ff-users-name">Freddy Fabricini</span></a></li>
	      </ul>
	  	</div>
  	</div>
  	
  	
<?php require_once '_footer.php'; ?>