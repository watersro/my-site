$(function() {
    $(window).scroll(function() {
      // Selectors
      var $window = $(window),
          $body = $('body'),
          $panel = $('.panel'),
          $header = $('.header'),
          $navLinks = $('.header__links'); // Selector for the navigation links container
  
      // Calculate the scroll position to trigger the color change
      var scroll = $window.scrollTop() + ($window.height() * 0.33);
  
      // Determine the color class based on the panel in view
      var headerColor = $panel.filter(function() {
          return $(this).position().top <= scroll && $(this).position().top + $(this).outerHeight() > scroll;
      }).data('color');
  
      // Function to update the header and nav links styling
      function updateStyling(element) {
          // Remove existing color and opacity classes
          element.removeClass(function (index, css) {
              return (css.match (/(^|\s)color-\S+|opacity-\S+/g) || []).join(' ');
          });
  
          // Add new color class and opacity
          if (headerColor) {
              element.addClass('color-' + headerColor);
              element.addClass('opacity-80');
          }
      }
  
      // Update styling for both header and nav links
      updateStyling($header);
      updateStyling($navLinks); // Apply the same dynamic styling to nav links
  
      // Additional code for adding class to body based on scroll position
      $panel.each(function () {
          var $this = $(this);
          
          if ($this.position().top <= scroll && $this.position().top + $this.outerHeight() > scroll) {
              $body.removeClass(function (index, css) {
                  return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
              });
              
              $body.addClass('color-' + $this.data('color'));
          }
      });    
    }).scroll();  // Trigger the scroll event on page load
  });
  