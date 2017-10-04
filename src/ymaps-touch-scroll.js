import 'dom4';

export default function ymapsTouchScroll(map, options = {}) {
  const prevScroll = options.hasOwnProperty('preventScroll') && options.preventScroll;
  const prevTouch = options.hasOwnProperty('preventTouch') && options.preventTouch;

  if (!prevScroll && !prevTouch) return;

  const parent = map.container.getParentElement();

  if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';

  const zIndex = getComputedStyle(map.container.getElement()).zIndex;

  const margin = map.margin.getMargin();
  for (const i in margin) margin[i] += 20;

  function createEl(elClass, appendBlock, elStyles) {
    const el = document.createElement('div');

    for (const key in elStyles) el.style[key] = elStyles[key];

    el.classList.add(elClass);

    appendBlock.appendChild(el);

    return el;
  }

  const block = createEl('ymaps-touch-scroll', parent, {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: zIndex - 1
  });

  const bg = createEl('ymaps-touch-scroll-bg', block, {
    background: '#000',
    opacity: '0',
    width: '100%',
    height: '100%',
    transition: 'opacity .1s ease-in-out'
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

    block.style.zIndex = show ? zIndex : zIndex - 1;
    bg.style.opacity = show ? '.5' : 0;
  }

  block.addEventListener('click', () => {
    blockToggle(false);
  });

  if (prevScroll) {
    function scrollToggle(on = true) {
      on ? map.behaviors.enable('scrollZoom') : map.behaviors.disable('scrollZoom');
    }

    scrollToggle(false);

    document.addEventListener('keydown', e => {
      if (e.keyCode === 17 && !map.behaviors.isEnabled('scrollZoom')) {
        scrollToggle();
        blockToggle(false);
      }
    });

    document.addEventListener('keyup', e => {
      if (e.keyCode === 17) scrollToggle(false);
    });

    map.events.add('wheel', () => {
      if (!map.behaviors.isEnabled('scrollZoom')) blockToggle();
    });

    parent.addEventListener('mouseleave', () => {
      blockToggle(false);
    });
  }

  if (prevTouch) {
    function touchToggle(on = true) {
      on ? map.behaviors.enable('drag') : map.behaviors.disable('drag');
    }

    parent.addEventListener('touchstart', e => {
      if (e.touches.length !== 2) {
        touchToggle(false);
        blockToggle(true, false);
      }
    });

    parent.addEventListener('touchend', () => {
      touchToggle();
      blockToggle(false, false);
    });
  }
}