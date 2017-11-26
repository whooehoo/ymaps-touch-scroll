export default function ymapsTouchScroll(map, options = {}) {
  const prevScroll = options.hasOwnProperty('preventScroll') && options.preventScroll;
  const prevTouch = options.hasOwnProperty('preventTouch') && options.preventTouch;

  if (!prevScroll && !prevTouch) return;

  const mapEl = map.container.getElement();
  const parent = map.container.getParentElement();

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

  function createEl(appendBlock, attributes = {}, tag = 'div') {
    const el = document.createElement(tag);
    for (const attribute of Object.keys(attributes)) el[attribute] = attributes[attribute];
    appendBlock.appendChild(el);
    return el;
  }

  // todo убрать трансформ и проверить троеточие
  const css = '.ymaps-touch-scroll{display:none;position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;transition:opacity .2s}' +
    '.ymaps-touch-scroll-bg{background:#000;height:100%;width:100%;opacity:.6}' +
    '.ymaps-touch-scroll-content{position:absolute;top:50%;left:0;transform:translateY(-50%);color:#fff;text-align:center;width:100%;overflow:hidden;box-sizing:border-box;text-overflow:ellipsis}';
  const style = createEl(document.head, {type: 'text/css'}, 'style');
  style.appendChild(document.createTextNode(css));

  const block = createEl(parent, {className: 'ymaps-touch-scroll'});
  const bg = createEl(block, {className: 'ymaps-touch-scroll-bg'});
  const content = createEl(block, {className: 'ymaps-touch-scroll-content'});

  // todo сделать паддинг для контента
  // const margin = map.margin.getMargin();
  // for (const i in margin) margin[i] += 20;
  // padding: margin.join('px ') + 'px'

  const textScroll = (options.hasOwnProperty('textScroll') && options.textScroll) ? options.textScroll : 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl';
  const textTouch = (options.hasOwnProperty('textTouch') && options.textTouch) ? options.textTouch : 'Чтобы переместить карту проведите по ней двумя пальцами';

  function blockToggle(show = true, isScroll = true) {
    if (show) content.textContent = isScroll ? textScroll : textTouch;
    show ? map.behaviors.disable('drag') : map.behaviors.enable('drag');

    if (show) block.style.display = 'block';
    else setTimeout(() => { block.style.display = 'none' }, 200);
    // else block.style.display = 'none';

    if (show) {
      setTimeout(() => { block.style.opacity = '1' }, 49);
      // block.style.opacity = '.6'
    }
    else block.style.opacity = '0';
  }

  map.events.add('click', () => {
    blockToggle(false);
  });

  if (prevScroll) {
    let isCtrlPress = false;

    document.addEventListener('keydown', e => {
      isCtrlPress = e.keyCode === 17;
      if (isCtrlPress) blockToggle(false);
    });

    document.addEventListener('keyup', e => {
      if (e.keyCode === 17) isCtrlPress = false;
    });

    function scrollToggle(on = true) {
      on ? map.behaviors.enable('scrollZoom') : map.behaviors.disable('scrollZoom');
    }

    scrollToggle(false);

    map.events.add('wheel', () => {
      scrollToggle(isCtrlPress);
      blockToggle(!isCtrlPress);
    });

    // map.events.add('mouseleave', e => {
    //   console.log(e);
    //   blockToggle(false);
    // });
  }

  // if (prevTouch) {
  if (false) {
    function touchToggle(on = true) {
      on ? map.behaviors.enable('drag') : map.behaviors.disable('drag');
    }

    ymaps.domEvent.manager.add(mapEl, 'touchstart', e => {
      if (e.get('touches').length !== 2) {
        touchToggle(false);
      } else {
        touchToggle();
      }
    });

    // ymaps.domEvent.manager.add(mapEl, 'touchmove', e => {
    //   if (e.get('touches').length !== 2) {
    //     blockToggle(true, false);
    //   }
    // });

    // ymaps.domEvent.manager.add(mapEl, 'touchend', e => {
    //   if (e.get('touches').length !== 2) touchToggle(false);
    // });



    // map.controls.events.add('mousedown', function (e) {
    //   console.log('1');
    //   e.stopPropagation();
    //   e.preventDefault();
    // });


    // map.events.add('mousedown', e => {
    //   console.log(e);
    // });
    //
    // parent.addEventListener('touchstart', e => {
    //   console.log('2');
    //   if (e.touches.length !== 2) {
    //     touchToggle(false);
    //     blockToggle(true, false);
    //   }
    // });
    //
    // parent.addEventListener('touchend', () => {
    //   touchToggle();
    //   blockToggle(false, false);
    // });
  }
}