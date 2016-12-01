$(function() {
  var $slider = $('#slider');
  var $root = $('html, body');
  var $nav = $('#navigation');
  var $navList = $nav.find('ul');
  var navListHeight = $navList.height();
  var $arrow = $nav.find('.icon-arrow');
  var navScrollTop = $nav.offset().top;
  var anchorArr = [];
  var secondFloor = $('#section-1').offset().top;
  var thirdFloor = $('#section-5').offset().top;

  // loazyload images
  var $loadingImg = $('img[data-src]');
  // count the img which has loaded
  var n = 0;
  // unslier plugin about banner
  $slider.unslider({
    autoplay: true,
    arrows: false,
    animation: 'fade'
  });

  $arrow.on('click', function() {
    var $this = $(this);
    if ($this.hasClass('down')) {
      $nav.animate({
        height: '2.4rem'
      }, 500)
      animateArrow('down', 'up');
    } else if ($this.hasClass('up')) {
      $nav.animate({
        height: '0.8rem'
      }, 500)
      animateArrow('up', 'down')
    }
    $navList.css('marginTop',0)
  })

  function animateArrow(action1, action2) {
    $arrow.animate({ opacity: 0 }, 250, function() {
      $arrow.removeClass(action1);
    });
    $arrow.animate({ opacity: 1 }, 250, function () {
      $arrow.addClass(action2);
    });
  }
  $nav.on('click', 'a', function () {
    var href = $.attr(this, 'href');
    $root.animate({
      scrollTop: $(href).offset().top
    }, 500);
  })
  // 收集页面上所有锚点
  function anchorCollection() {
    $nav.find('a').each(function(index, e) {
      anchorArr.push($($(e).attr('href')));
    })
  };
  anchorCollection();
  // 导航栏样式切换
  function silbingsNav(node) {
    node.addClass('active')
      .siblings().removeClass('active')
      .parent().siblings().children().removeClass('active');
  }

  // 节流函数
  /**
   * @param fun    要执行的函数
   * @param delay  下次触发fun函数的时间延迟
   * @param time   两次滚动监听大于time即可执行fun
   */
  function throttle(fun, delay, time) {
    var timeout;
    var starTime = new Date();

    return function() {
      var context = this;
      var args = arguments;
      var currentTime = new Date();

      clearTimeout(timeout);
      // 当第二次触发的时间大于设定的time时间间隔，就执行函数
      if (currentTime - starTime >= time) {
        fun.apply(context, args);  // 将匿名函数的上下文环境绑定到fun函数，方便扩展
        starTime = currentTime;    // 更新起始时间
      } else {
        // 没达到时间，delay时间后再次触发函数
        timeout = setTimeout(fun, delay);
      }
    }
  }

  // 导航栏锚点样式随windowTop不同切换
  function cutNavStyle() {
    var windowTop = $(window).scrollTop();
    for (var i = 0; i < anchorArr.length; i++) {
      if (windowTop >= anchorArr[i].offset().top - 1 && windowTop < anchorArr[i+1].offset().top - 1) {
        var id = anchorArr[i].attr('id');
        silbingsNav($nav.find('[href=#' + id + ']'));
      } else if (windowTop >= anchorArr[11].offset().top - 1) {
        var id = anchorArr[anchorArr.length-1].attr('id');
        silbingsNav($nav.find('[href=#' + id + ']'));
      }
    }
  }
  // 导航栏三层切换
  function cutNavFloor() {
    var windowTop = $(window).scrollTop();
    if (windowTop >= secondFloor - 1 && windowTop < thirdFloor - 1) {
      $navList.css({
        "marginTop": -navListHeight/3
      })
    } else if (windowTop >= thirdFloor - 1) {
      $navList.css({
        "marginTop": (-navListHeight/3) * 2
      })
    } else {
      $navList.css({
        "marginTop": '0'
      })
    }
  }

  // 懒加载
  function lazyLoad() {
    for (var i = n; i < $loadingImg.length; i++) {
      if ($loadingImg.eq(i).offset().top < parseInt($(window).height()) + $(window).scrollTop()) {
        var src = $loadingImg.eq(i).data('src');
        $loadingImg.eq(i).attr('src', src).removeAttr('data-src');
        n = i + 1
      }
    }
  }

  $(window).scroll(function() {
    var windowTop = $(window).scrollTop();
    if (windowTop > navScrollTop) {
      $nav.css({
        'position': 'fixed',
        'top': '0'
      })
    } else {
      $nav.css({
        'position': 'absolute'
      })
    }

    // 滚动时隐藏导航栏下拉菜单
    if ($arrow.hasClass('up')) {
      $arrow.trigger('click');
    }

  })
  window.addEventListener('scroll', throttle(lazyLoad, 300, 700));
  window.addEventListener('scroll', throttle(cutNavStyle, 200, 200));
  window.addEventListener('scroll', throttle(cutNavFloor, 200, 200));
});
