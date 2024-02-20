$(function() {
  $(window).scroll(function() {
    // Selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel'),
        $header = $('.header');

    // Calculate the scroll position to trigger the color change
    var scroll = $window.scrollTop() + ($window.height() * 0.33);

    // Add class to header based on scroll position
    var headerColor = $panel.filter(function() {
        return $(this).position().top <= scroll && $(this).position().top + $(this).outerHeight() > scroll;
    }).data('color');

    // Remove existing color and opacity classes from header
    $header.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+|opacity-\S+/g) || []).join(' ');
    });

    // Add new color class to header
    if (headerColor) {
        $header.addClass('color-' + headerColor);
        $header.addClass('opacity-80');
    }

    // Add class to body based on scroll position
    $panel.each(function () {
        var $this = $(this);
        
        // Check if the panel is within range of the scroll position
        if ($this.position().top <= scroll && $this.position().top + $this.outerHeight() > scroll) {
            // Remove all existing color classes from body
            $body.removeClass(function (index, css) {
                return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
            });
            
            // Add class of currently active div to body
            $body.addClass('color-' + $this.data('color'));
        }
    });    
  }).scroll();  // Trigger the scroll event on page load
});