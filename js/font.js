var $noteFont = (function() {
  var $note = $(''
      + '<div class="notepad-dlg-mask font">'
        + '<div class="dialogbox notepad-dlgbox">'
          + '<div class="notepad-dlg-titlebar">'
            + '<p class="title">字体</p>'
            + '<span class="close-btn" title="关闭">✖</span>'
          + '</div>'
          + '<div class="main notepad-dlg-main">'
            + '<div class="font-family"><p>字体(F):</p></div>'
            + '<div class="font-style"><p>字形(Y):</p></div>'
            + '<div class="font-size"><p>大小(S):</p></div>'
            + '<fieldset class="sample">'
              + '<legend>示例</legend>'
              + '<p class="sample-txt">AaBbYyZz</p>'
            + '</fieldset>'
            + '<div class="script">'
              + '<label>'
                + '脚本(R):<br>'
                + '<select>'
                  + '<option value="西欧语言">西欧语言</option>'
                  + '<option value="中文 GB2312">中文 GB2312</option>'
                + '</select>'
              + '</label>'
            + '</div>'
            + '<input class="btn-ok btn" type="button" value="确定">'
            + '<input class="btn-cancel btn" type="button" value="取消">'
          + '</div>'
        + '</div>'
      + '</div>');

  var $btnOk = $note.find('.btn-ok'),
      $btnClose = $note.find('.close-btn'),
      $btnCancel = $note.find('.btn-cancel'),
      $sample = $note.find('.sample-txt'),
      $titleBar = $note.find('.notepad-dlg-titlebar');

  var fonts = ['Agency FB', 'Algerian', 'Arial', 'Arial Rounded MT', 'Axure Handwriting', 'Bahnschrift', 'Baskerville Old Face', '楷体','仿宋'],
      styles = ['常规', '斜体', '粗体', '粗偏斜体'],
      sizes = ['8', '9', '10', '11', '12', '14', '16', '18', '20', '22', '24', '26', '28', '36', '48', '72'];

  var lbox = {
    family: 'Arial',
    style: '常规',
    size: '16',
    okHandler: null
  };

  function sample() {
    $sample.css({ 'font-family': lbox.family, 'font-size': lbox.size + 'pt' });
    if(lbox.style === '常规') {
      $sample.css({'font-style': 'normal'});
      $sample.css({'font-weight': 'normal'});
      return;
    }

    if(lbox.style === '斜体') {
      $sample.css({'font-style': 'italic'});
      $sample.css({'font-weight': 'normal'});
      return;
    }

    if(lbox.style === '粗体') {
      $sample.css({'font-weight': 'bold'});
      $sample.css({'font-style': 'normal'});
      return;
    }

    if(lbox.style === '粗偏斜体') {
      $sample.css({'font-weight': 'bold', 'font-style': 'italic'});
      return;
    }
  }

  function init() {
    var lstFamily = new comList();
    lstFamily.show({
      container: '.font .font-family',
      width: '176px',
      list: fonts,
      select: fonts.indexOf(lbox.family),
      isFont: true,
      selectHandler: function(e) {
        lbox.family = fonts[e];
        sample();
      }
    });

    var lstStyle = new comList();
    lstStyle.show({
      container: '.font .font-style',
      width: '132px',
      list: styles,
      select: styles.indexOf(lbox.style),
      isFontStyle: true,
      selectHandler: function(e) {
        lbox.style = styles[e];
        sample();
      }
    });

    var lstSize = new comList();
    lstSize.show({
      container: '.font .font-size',
      width: '64px',
      list: sizes,
      select: sizes.indexOf(lbox.size),
      selectHandler: function(e) {
        lbox.size = sizes[e];
        sample();
      }
    });

    sample();
  }

  function destory() { $note.remove(); }

  function show(conf) {
    $.extend(lbox, conf);

    $('body').append($note);
    init();
    $note.find('.dialogbox').draggable({handle: $titleBar});

    $btnClose.click(destory);
    $btnCancel.click(destory);
    $btnOk.click(function() {
      lbox.okHandler({
        family: lbox.family,
        style: lbox.style,
        size: lbox.size
      });

      destory();
    });

    $note.click(function(e) {
      e.stopPropagation();
    });
  }

  return {show: show};
}());
