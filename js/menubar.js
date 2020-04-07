//菜单栏

var $menubar = (function() {
  var $bar = $('<div class="notepad-menubar"></div>');
  var menuData,           // 所有菜单数据
      menus = [];         // 存放五个下拉菜单的 DOM 对象

  //下拉菜单是否展开，没有展开为：-1,展开为：n，n 代表展开的是第几个菜单 
  var stamp = -1;

  //初始化
  function init() {
    createMenuTitle();
    createMenus();
    $('body').append($bar);
  }

  function show(data) {
    menuData = data;
    init();
  }
  //创建一级标题
  function createMenuTitle() {
    var $firsttitles = $('<ul class="menu-title"></ul>');

    for(var i=0; i<menuData.length; i++) {
      var $title = $('<li class="title"></li>');

      $title.text(menuData[i].title);//设置菜单标题内容
      $title.attr('data-id', i);//设置属性和值
      $firsttitles.append($title);

      $title.click(function(e) {
        var i = Number(this.dataset.id);

        if(stamp === -1) {
          menus[i].css({ display: 'inline-block' });
          stamp = i;
        } else if(stamp !== i) {
          menus[stamp].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          stamp = i;
        } else {
          menus[stamp].css({ display: 'none' });
          stamp = -1;
        }

        e.stopPropagation();
      });

      $title.hover(function() {
        if(stamp !== -1) {
          var i = Number(this.dataset.id);

          menus[stamp].css({ display: 'none' });
          menus[i].css({ display: 'inline-block' });
          stamp = i;
        }
      });
    }

    $bar.append($firsttitles);
  }
//创建二级标题
  function createMenus() {
    for(var i=0; i<menuData.length; i++) {
      var $secondtitle = $('<ul class="menus"></ul>'),
          items = menuData[i].menuItems;

      for(var j=0; j<items.length; j++) {
        if(items[j].title === 'hr') {
          var $hr = $('<li class="menu-hr"></li>');
          $secondtitle.append($hr);
          continue;
        }

        var $menu = $('<li class="menu-item"></li>');

        $menu.html(items[j].title);
        $menu.attr('data-x', i);
        $menu.attr('data-y', j);

        if(items[j].shortcut !== '') {
          var $shorcut = $('<span class="shortcut"></span>');

          $shorcut.html(items[j].shortcut);
          $menu.append($shorcut);
        }

        if(!items[j].enabled) $menu.addClass('disabled');

        $secondtitle.append($menu);

        $menu.click(function(e) {
          e.stopPropagation();

          if($(this).hasClass('disabled')) return;

          var i = this.dataset.x, j = this.dataset.y;

          menus[i].css({display: 'none'});
          stamp = -1;

          menuData[i].menuItems[j].handler();
        });
      }

      $secondtitle.css({
        width: menuData[i].width,
        left: menuData[i].left,
        display: 'none'
      });

      $bar.append($secondtitle);
      menus.push($secondtitle);
    }
  }

  /**
   * 设置菜单项是否为勾选状态
   *checked(一级标题，二级标题，是否勾选)
   */
  function checked(one, two, isChecked) {
    var menuItem = menus[one].find('.menu-item')[two];

    if(isChecked) {//isChecked true 为勾选，false 为取消勾选
      $(menuItem).prepend($('<span class="checked">✓</span>')[0]);
    } else {
      $(menuItem).find('.checked').remove();
    }
  }

  //设置菜单项为启用或禁用状态
  function enabled(one, two, isEnabled) {
    var menuItem = menus[one].find('.menu-item')[two];

    if(isEnabled) {//isEnabled true 为启用，false 为禁用
      $(menuItem).removeClass('disabled');
    } else {
      $(menuItem).addClass('disabled');
    }
  }

  function hideMenu() {
    if(stamp === -1) return;
    menus[stamp].css({display: 'none'});
    stamp = -1;
  }
  return {
    show: show,
    checked: checked,
    enabled: enabled,
    hideMenu: hideMenu
  };
}());
