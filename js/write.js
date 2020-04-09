//编辑区
var $write = (function() {
  var $DOM = $(''
      + '<div class="notepad-write">'
        + '<textarea spellcheck="false" auto-size="none"></textarea>'
      + '</div>');

  var $textArea = $DOM.find('textarea');

  var lbox = {
    posHandler: null,
    contentHandler: null,
    wrap: false
  };

  function resize(isBig) {
    if(isBig) {
      $DOM.css({bottom: '21px'});
    } else {
      $DOM.css({bottom: '0'});
    }
  }

  function focus() {
    $textArea.focus();
  }

  function setWrap(bWrap) {
    if(bWrap) {
      $textArea.attr('wrap', 'soft');
      $textArea.css({'overflow-x': 'hidden'});
    } else {
      $textArea.attr('wrap', 'off');
      $textArea.css({'overflow-x': 'scroll'});
    }
  }

  function setFont(e) {
    $textArea.css({'font-family': e.family, 'font-size': e.size + 'pt'});
    if(e.style === '常规') {
      $textArea.css({'font-style': 'normal'});
      $textArea.css({'font-weight': 'normal'});
      return;
    }
    if(e.style === '斜体') {
      $textArea.css({'font-style': 'italic'});
      $textArea.css({'font-weight': 'normal'});
      return;
    }

    if(e.style === '粗体') {
      $textArea.css({'font-weight': 'bold'});
      $textArea.css({'font-style': 'normal'});
      return;
    }

    if(e.style === '粗偏斜体') {
      $textArea.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }


  function insertDataTime() {
    var str = $textArea.val();

    var strLeft = str.substring(0, $textArea[0].selectionStart),
        strRight = str.substring($textArea[0].selectionEnd, str.length);

    str = strLeft + new Date().toLocaleString() + strRight;

    $textArea.val(str);
    $textArea.focus();
    lbox.posHandler(getRow(), getCol());
  }

  function show(conf) {
    $.extend(lbox, conf);

    $('body').append($DOM);
    $textArea.trigger('focus');
    setWrap(lbox.wrap);
  }

  return {
    show: show,
    resize: resize,
    focus: focus,
    setWrap: setWrap,
    insertDataTime: insertDataTime,
    setFont: setFont
  };
}());
