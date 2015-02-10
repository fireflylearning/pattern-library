var ffMarkGrid__markCurrentTask = function(obj) {
    
    //adds a class of 'ff-mark-grid-active' to <th> and <th> elements
    //that match the content of 'data-ff-mark-grid-task' 
    //required for responisveness
    
    var currentTask = obj.attr('data-ff-mark-grid-task');
    
    //mark results
    $('td[headers]',obj).each(function() {
        $that = $(this);
        $that.removeClass('ff-mark-grid-active');
        if($that.attr('headers') == currentTask) {
            $that.addClass('ff-mark-grid-active');  
        };
    });
    
};

$(function() {
    $('.ff-mark-grid').each(function() {
        ffMarkGrid__markCurrentTask($(this));
    });  
});