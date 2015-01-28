<? require_once '_htmlhead.php'; ?>
	
	<div class="pattern">
		
		<div class="ff-heading">
			<h1>Your Bookmarks</h1>
		</div>
		
		<div class="ff-actions ff-page-actions">
    	  <div class="ff-actions-primary ff-actions-title">
    	    <h2>Personal Bookmarks</h2>
    	  </div>
    	  <div class="ff-actions-secondary">
          	<a href="#" class="ff-button ff-button-add ff-icon ff-icon-bookmark"><span>Organise Bookmarks</span></a>
      	  </div>
    	</div>
    	
    	<div class="ff-links-list">
			<ul>
				<li>
					<a href="#">Planets of the Solar System</a>
					<div class="ff-links-list-actions"><a href="#">Rename</a></div>
				</li>
				<li>
					<a href="#">Lunch Menu</a>
					<div class="ff-links-list-actions"><a href="#">Rename</a></div>
				</li>
				<li>
					<a href="#">Trips booking form</a>
					<div class="ff-links-list-actions"><a href="#">Rename</a></div>
				</li>
			</ul>
    	</div>
    	
    	<div class="ff-actions ff-page-actions">
    	  <div class="ff-actions-primary ff-actions-title">
    	    <h2>Recommened Bookmarks</h2>
    	  </div>
    	</div>
    	
    	<div class="ff-filter">
			<form name="bookmarksform" class="ff-form" method="GET">
				 
				<label for="group">
					Recommended to:
				</label> 
				<select name="group">
					 
					<option>
						All Groups
					</option>
				</select> 
				<label for="sort">
					Sort by:
				</label> 
				<select name="sort">
					 
					<option>
						Newest
					</option> 
					<option value="visited">
						Last Visited
					</option> 
					<option value="popular">
						Most Popular
					</option>
				</select>
			</form>
		</div>
    	
    	<div class="ff-links-list">
			<ul>
				<li>
					<a href="#">Art > Materials</a>
				</li>
				<li>
					<a href="#">French > Verbs List</a>
				</li>
				<li>
					<a href="#">History > The Battle of Britan</a>
				</li>
			</ul>
    	</div>
		
		
	</div>
	
<? require_once '_footer.php'; ?>