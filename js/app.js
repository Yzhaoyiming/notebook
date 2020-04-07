var all = {};               

all.config = {
  'appContainer': '.notepad-app'
};
all.bWrap          = false;   // 换行
all.fontFamily     = 'Arial'; // 默认字体
all.fontStype      = '常规';  // 默认字体样式
all.fontSize       = '16';    // 默认字体大小
all.fontHandler = function(e) {
  all.fontFamily = e.family;
  all.fontStype = e.style;
  all.fontSize = e.size;
  $write.setFont(e);
};

$(function() {
  $menubar.show(all.menuData);
  $write.show({   
    contentHandler: function(isEmpty) {
      $menubar.enabled(1, 6, isEmpty);
    }
  });
  $write.setFont({
    family: all.fontFamily,
    style: all.fontStype,
    size: all.fontSize
  });
  var $app = $('body');

  $app.click(function() {
    $menubar.hideMenu();
    $write.focus();
  });
});
