<? require_once '_htmlhead.php'; ?>
	
	<div class="pattern">
		
		<div class="ff-heading">
			<h1>Your Tasks</h1>
		</div>
		
		
		<div class="ff-actions">
			<div class="ff-actions-primary ff-actions-title">
				<span>There are <strong>10 active tasks</strong> assigned to you.</span>
			</div>
			<div class="ff-actions-secondary">
				<div class="ff-nav-switch">
					<ul class="ff-nav-switch-items">
						<li class="unselected"><a href="#">Archive</a></li>
						<li class="selected ff-icon ff-icon-selected"><span>Active</span></li>
					</ul>
				</div>
				<a href="#" class="ff-button ff-icon ff-icon-task-add">Add a Personal Task</a>
			</div>
		</div>
		
		
		<ol class="ff-messages ff-messages-tasks">
			<li class="ff-message-notice ff-task ff-offline ff-color-red">
		<div class="ff-message-content">
			<div class="ff-message-text">
				<p>
					Offline task
				</p>
				<ul class="ff-message-attachments">
				</ul>
			</div>
			<div class="ff-checkbox">
				<a class="ff-button ff-button-checkbox ff-action-markasdone"><span>Mark as Done</span></a>
			</div>
			<div class="ff-message-meta-and-labels">
				<p class="ff-message-meta">
					<span class="ff-label ff-label-overdue">Overdue</span> Posted by <a href="#">Administrator</a> to <strong>Administrators</strong>, 31/03/2014 at 14:09
				</p>
				<ul class="ff-labels-color">
					<li class="ff-label-color-grey">
						<a>Gray</a>
					</li>
					<li class="ff-label-color-red ff-selected">
						<a>Red</a>
					</li>
					<li class="ff-label-color-blue">
						<a>Blue</a>
					</li>
					<li class="ff-label-color-yellow">
						<a>Yellow</a>
					</li>
					<li class="ff-label-color-green">
						<a>Green</a>
					</li>
					<li class="ff-label-color-orange">
						<a>Orange</a>
					</li>
					<li class="ff-label-color-pink">
						<a>Pink</a>
					</li>
					<li class="ff-label-color-purple">
						<a>Purple</a>
					</li>
					<li class="ff-label-color-empty">
						<a>NoColour</a>
					</li>
				</ul>
			</div>
		</div>
	</li>
		</ol>
		
		
	</div>
	
<? require_once '_footer.php'; ?>