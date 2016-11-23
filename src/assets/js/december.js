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
    $(this).addClass('active').parent().siblings().children().removeClass('active')
    return false;
  });

  // side nav scroll screen
  var sideNavInitTop = $sideNav.offset().top;
  $(window).scroll(function() {
    var windowTop = $(window).scrollTop();
    if (windowTop > sideNavInitTop - 120) {
      $sideNav.css({
        'position': 'fixed',
        'top': 120
      });
    } else {
      $sideNav.css({
        'position': 'absolute',
        'top': -5
      })
    }
  })
})
