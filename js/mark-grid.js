//temp js to help with markup...

/*
    ---
    isSmall: checks if the markbook should be in mobile mode
    ---    
*/

var ffMarkGrid__isSmall = function(obj)
{
    var breakpoint = 800;
    
    if(obj.width() <= breakpoint)
    {
        obj.addClass('ff-mark-book-small');
        ffMarkGrid__releaseWidth(obj);
        
    }
    else
    {
        obj.removeClass('ff-mark-book-small');
        ffMarkGrid__setWidth(obj);
    } 
};

/*
    ---
    fixHeader: checks if the .ff-mark-grid-header objects should be fixed to the top of the page
    ---    
*/

var ffMarkGrid__fixHeader = function(obj)
{
  
  
  $(window).on("scroll.ffMarkGridScroll",function()
  {
      if(!obj.hasClass('ff-mark-book-small'))
      {
            var aboveHeight = obj.offset().top;
            var objHeight = obj.outerHeight(false);
            var headerWidth = $('.ff-mark-grid-results',obj).outerWidth(false);	
            var totalTasks = obj.attr('data-ff-mark-grid-tasks'); 
            var tasksWidth = 60 * totalTasks;
            if ($(window).scrollTop() > aboveHeight && $(window).scrollTop() < (aboveHeight + objHeight)) 
            {
                obj.addClass('ff-mark-grid-fixed-header');
                $('.ff-mark-grid-results .ff-mark-grid-header',obj).css('width',headerWidth);
                $('.ff-mark-grid-results .ff-mark-grid-header > ol',obj).css('width',tasksWidth);
            }
            else
            {
                obj.removeClass('ff-mark-grid-fixed-header');
                $('.ff-mark-grid-results .ff-mark-grid-header',obj).css('width','');
                $('.ff-mark-grid-results .ff-mark-grid-header > ol',obj).css('width','');
            }
      }
      else
      {
          $(window).off('.ffMarkGridScroll');
      }
  });
    
};


/*
    ---
    setWidth: set the width of the overflow box in the right hand columm
    ---    
*/
var ffMarkGrid__setWidth = function(obj)
{
    totalTasks = obj.attr('data-ff-mark-grid-tasks');
    width = 60 * totalTasks;
    $('.ff-mark-grid-results-wrapper').css('width',width);
}
var ffMarkGrid__releaseWidth = function(obj)
{
    $('.ff-mark-grid-results-wrapper').css('width','');
}

/*
    ---
    scrollTo: scroll to a location within the grid
    ---    
*/

var ffMarkGrid__scrollTo = function(obj,distance,direction)
{
    $('.ff-mark-grid-results',obj).on("scroll",function()
    {
        if(obj.hasClass('ff-mark-grid-fixed-header'))
        {
            var position = $('.ff-mark-grid-results-body',this).position();
            $('.ff-mark-grid-header ol',this).css('left',position.left);
            console.log(position.left);
        }
        
    });
}

/*
    ---
    ffPopover__show: show this popover!
    ---    
*/

var ffPopover__show = function(obj)
{
    
    //firstly hide any popovers / kill js-generated popovers
    ffPopover__hide();
    
    
    var popover = $('.ff-popover',obj);
    
    //now, either clone a template popover OR show this in place
    if(popover.hasClass('ff-popover-js-template'))
    {
        var offset = obj.offset();
        var height = obj.height();
        var width = popover.width();
        
        var top = offset.top + height;
        var left = offset.left - ((width/2) - 30);
        
        popover.clone().appendTo('body').addClass('ff-popover-js-generated').css({
            'top' : top,
            'left' : left 
        }).fadeIn();
    }
    else
    {
        popover.fadeIn();
    }
}

var ffPopover__hide = function()
{
    $('.ff-popover').hide();
    $('.ff-popover-js-generated').remove();
}


/*
    ---
    Call when dom is ready / resize event fires.
    If you keep any of this js, you should chnage these events to use the 
    Firefly event firing API.
    ---    
*/

$(function() 
{
    
    $('.ff-mark-grid').each(function() 
    {
        $that = $(this);
        ffMarkGrid__isSmall($that);
        ffMarkGrid__fixHeader($that);
        ffMarkGrid__scrollTo($that);
    }); 
    
    $( window ).resize(function()
    {
        $('.ff-mark-grid').each(function() 
        {
            $that = $(this);
            ffMarkGrid__isSmall($that);
            ffMarkGrid__fixHeader($that);
        }); 
    });
    
    
    $('.ff-popover-trigger').on("click",function() 
    {
        ffPopover__show($(this));
    });
    $('body').on("click",function(e) 
    {
        if ($(e.target).closest('.ff-popover-trigger, .ff-popover').length === 0) {
            ffPopover__hide()
        }
    });
     
});