$(function() {
  var $sideNav = $('#nav');
  var $slider = $('#slider');
  var $root = $('html, body');

  // unslier plugin about banner
  $slider.unslider({
    autoplay: true,
    arrows: false,
    animation: 'fade'
  });

  // side nav clicked effect
  // side nav Anchor
  $sideNav.find('a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
      scrollTop: $(href).offset().top
    }, 500);
    $(this).addClass('active').parent().siblings().children().removeClass('active');
    return false;
  });

  // side nav scroll screen
  var sideNavInitTop = $sideNav.offset().top;
  var lastTop = $('#part-last').offset().top;
  var mediaWidth = document.body.scrollWidth;
  $(window).scroll(function() {
    var windowTop = $(window).scrollTop();
    if (windowTop > sideNavInitTop - 120 && windowTop <= lastTop) {
      if (mediaWidth > 1366) {
        $sideNav.css({
          'position': 'fixed',
          'top': 120
        });
      } else {
        $sideNav.css({
          'position': 'fixed',
          'top': 0
        });
      }
    } else if (windowTop > lastTop) {
      $sideNav.css({
        'position': 'absolute',
        'top': lastTop - sideNavInitTop - 30
      })
    } else {
      $sideNav.css({
        'position': 'absolute',
        'top': -5
      })
    }
  })
});
