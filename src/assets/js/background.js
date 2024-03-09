$(function() {
    // Check if it's the index page based on the data attribute of the div
    var isIndexPage = $('[data-page-type="index"]').length > 0;
  
    $(window).scroll(function() {
      var $window = $(window),
          $header = $('.header'),
          $navLinks = $('.header__links');
  
      if (isIndexPage) {
        var $body = $('body'),
            $panel = $('.panel'),
            scroll = $window.scrollTop() + ($window.height() * 0.33),
            headerColor = $panel.filter(function() {
              return $(this).position().top <= scroll && $(this).position().top + $(this).outerHeight() > scroll;
            }).data('color');
  
        function updateStyling(element) {
          element.removeClass(function(index, css) {
            return (css.match(/(^|\s)color-\S+|opacity-\S+/g) || []).join(' ');
          });
  
          if (headerColor) {
            element.addClass('color-' + headerColor);
            element.addClass('opacity-80');
          }
        }
  
        updateStyling($header);
        updateStyling($navLinks);
  
        $panel.each(function() {
          var $this = $(this);
          if ($this.position().top <= scroll && $this.position().top + $this.outerHeight() > scroll) {
            $body.removeClass(function(index, css) {
              return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });
  
            $body.addClass('color-' + $this.data('color'));
          }
        });
      } else {
        $('.header, .header__links').css('background-color', 'var(--background-col)');
      }
    }).scroll();
  });
  