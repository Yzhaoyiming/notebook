function comList() {
  var $comList = $(''
      + '<div class="list">'
        + '<input class="write" type="text"><br>'
        + '<ul class="list">'
        + '</ul>'
      + '</div>');

  var $write = $comList.find('.write'),
      $list = $comList.find('.list'),
      $items;

  var lbox = {
    container: '',
    list: [],
    select: 0,
    width: '200px',
    isFont: false,
    isFontStyle: false,
    selectHandler: null
  };

  function setFontStyle(item, style) {
    if(style === '常规') {
      item.css({'font-style': 'normal'});
      item.css({'font-weight': 'normal'});

      return;
    }
    if(style === '斜体') {
      item.css({'font-style': 'italic'});
      item.css({'font-weight': 'normal'});

      return;
    }

    if(style === '粗体') {
      item.css({'font-weight': 'bold'});
      item.css({'font-style': 'normal'});


      return;
    }

    if(style === '粗偏斜体') {
      item.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }

  function fillData() {
    var i = 0, $item;

    if(lbox.isFont) {
      for(i=0; i<lbox.list.length; i++) {
        $item = $('<li class="item"></li>');
        $item.css({'font-family': lbox.list[i]});
        $list.append($item.html(lbox.list[i]));
      }
    } else if(lbox.isFontStyle) {
      for(i=0; i<lbox.list.length; i++) {
        $item = $('<li class="item"></li>');
        setFontStyle($item, lbox.list[i]);
        $list.append($item.html(lbox.list[i]));
      }
    } else {
      for(i=0; i<lbox.list.length; i++) {
        $item = $('<li class="item"></li>');
        $list.append($item.html(lbox.list[i]));
      }
    }

    $items = $list.find('.item');
  }

  function setSelect(n) {
    $($items[n]).addClass('selected');
    $write.val(lbox.list[n]);
    $write.select();
  }

  function init() {
    var $oldList = $(lbox.container).find('.list');
    if($oldList.length !== 0) $oldList.remove();
     
    $(lbox.container).append($comList);
    
    $comList.css({ width: lbox.width });
    fillData();
    setSelect(lbox.select);
  }

  this.show = function(conf) {
    $.extend(lbox, conf);
    init();

    $list.click(function(e) {
      $($items[lbox.select]).removeClass('selected');
      lbox.select = lbox.list.indexOf($(e.target).html());
      $($items[lbox.select]).addClass('selected');
      $write.val(lbox.list[lbox.select]);
      $write.select();
      lbox.selectHandler(lbox.select);
    });

    $write.keyup(function() {
      var i = 0;

      for(i=0; i<lbox.list.length; i++) {
        if(lbox.list[i].indexOf($write.val()) === 0) break;
      }

      if(i === lbox.list.length) return;

      $items[i].scrollIntoView({behavior: 'smooth', block: 'start'});
      $($items[lbox.select]).removeClass('selected');
      $($items[i]).addClass('selected');
      lbox.select = i;
    });
  };
}
