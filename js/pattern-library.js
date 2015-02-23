$(function() {
    $('.show-source').click(function(e) {
        e.preventDefault();
       var source = $(this).closest('.source');
       $('pre',source).toggle(); 
    });
       
});