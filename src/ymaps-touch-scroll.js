export default function ymapsTouchScroll(map, options = {}) {
  const prevScroll = options.hasOwnProperty('preventScroll') && options.preventScroll;
  const prevTouch = options.hasOwnProperty('preventTouch') && options.preventTouch;

  if (!prevScroll && !prevTouch) return;

  const mapEl = map.container.getElement();
  mapEl.style.transition = 'opacity .2s';

  const parent = map.container.getParentElement();

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

  const margin = map.margin.getMargin();
  for (const i in margin) margin[i] += 20;

  function createEl(elClass, appendBlock, elStyles) {
    const el = document.createElement('div');

    for (const key in elStyles) el.style[key] = elStyles[key];

    el.className = elClass;

    appendBlock.appendChild(el);

    return el;
  }

  const block = createEl('ymaps-touch-scroll', parent, {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: '-1'
  });

  const bg = createEl('ymaps-touch-scroll-bg', block, {
    background: '#000',
    width: '100%',
    height: '100%'
  });

  const content = createEl('ymaps-touch-scroll-content', block, {
    position: 'absolute',
    top: '50%',
    left: '0',
    transform: 'translateY(-50%)',
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    overflow: 'hidden',
    boxSizing: 'border-box',
    textOverflow: 'ellipsis',
    padding: margin.join('px ') + 'px'
  });

  const textScroll = options.hasOwnProperty('textScroll') ? options.textScroll : 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl';
  const textTouch = options.hasOwnProperty('textTouch') ? options.textTouch : 'Чтобы переместить карту проведите по ней двумя пальцами';

  function blockToggle(show = true, isScroll = true) {
    if (show) content.textContent = isScroll ? textScroll : textTouch;
    show ? map.behaviors.disable('drag') : map.behaviors.enable('drag');
    mapEl.style.opacity = show ? '.3' : '1';
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

    map.events.add('mouseleave', () => {
      blockToggle(false);
    });
  }

  if (prevTouch) {
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