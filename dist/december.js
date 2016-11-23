$(function() {
  var $sideNav = $('#nav');
  var $slider = $('#slider');
  var $root = $('html, body');
  $slider.unslider({
    autoplay: true,
    arrows: false,
    animation: 'fade'
  });

  $sideNav.find('a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
      scrollTop: $(href).offset().top
    }, 500);
    return false;
  });
})
