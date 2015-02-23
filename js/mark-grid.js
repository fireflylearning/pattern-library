//temp js to help with markup...
//@Ben — most of this is probably bonkers

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
            if ($(window).scrollTop() > aboveHeight && $(window).scrollTop() < (aboveHeight + objHeight)) //fix header
            {
                obj.addClass('ff-mark-grid-fixed-header');
                $('.ff-mark-grid-results .ff-mark-grid-header',obj).css('width',headerWidth);
                $('.ff-mark-grid-results .ff-mark-grid-header > ol',obj).css('width',tasksWidth);
            }
            else //release header
            {
                obj.removeClass('ff-mark-grid-fixed-header');
                $('.ff-mark-grid-results .ff-mark-grid-header',obj).css('width','');
                $('.ff-mark-grid-results .ff-mark-grid-header > ol',obj).css('width','');
            }
            
           ffMarkGrid__syncScrollPosition(obj);
            
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
    controlScroll: contolling all things scroll.
    ---    
*/

var ffMarkGrid__controlScroll = function(obj)
{
    //watch the scroll position of the grid and react when in fixed mode.
    $('.ff-mark-grid-results',obj).on("scroll",function()
    {
        if(obj.hasClass('ff-mark-grid-fixed-header'))
        {
            ffMarkGrid__syncScrollPosition(obj);
        }
        
    });
    
    
    $('[data-ff-markbook-control]').on("click",function() 
    {
       var str = $(this).attr('data-ff-markbook-control'); 
       var options = str.split(',');
       var direction = options[0];
       var distance = options[1];
       
       ffMarkGrid__scrollTo(obj,direction,distance);
    });
    
}

/*
    ---
    syncScrollPosition: syncs the scroll left / right position when user scrolls with the mouse OR when we switch from/to fixed header mode.
    ---    
*/

var ffMarkGrid__syncScrollPosition = function(obj)
{
    var position = $('.ff-mark-grid-results-body',obj).position();
    $('.ff-mark-grid-header ol',obj).css('left',position.left);
}

/*
    ---
    scrollTo: Manual Scroll using the buttons.
    ---    
*/

var ffMarkGrid__scrollTo = function(obj,direction,distance)
{
    var target = $('.ff-mark-grid-results',obj);
    var markWidth = 60;
    if(direction == 'forward')
    {
        target.animate({
            scrollLeft: '+=' + (markWidth * distance)
        },300,'swing');
    }
    else
    {
        target.animate({
            scrollLeft: '-=' + (markWidth * distance)
        },300,'swing');
    }
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
        ffMarkGrid__controlScroll($that);
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