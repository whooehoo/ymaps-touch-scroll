import isMobile from 'ismobilejs';

export default function ymapsTouchScroll(map, options = {}) {
  const prevScroll = options.hasOwnProperty('preventScroll') && options.preventScroll;
  const prevTouch = options.hasOwnProperty('preventTouch') && options.preventTouch && isMobile && isMobile.any && map.behaviors.isEnabled('multiTouch');

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

  function blockToggle(show = true) {
    block.style.zIndex = show ? zIndex : zIndex - 1;
    bg.style.opacity = show ? '.5' : 0;
  }

  if (prevScroll) {
    // todo перенести в blockToggle
    content.textContent = options.hasOwnProperty('textScroll') ? options.textScroll : 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl';

    function scrollToggle(on = true) {
      if (on) {
        if (map.behaviors.isEnabled('scrollZoom')) return;

        map.behaviors.enable('scrollZoom');
        blockToggle(false);
      } else map.behaviors.disable('scrollZoom');
    }

    scrollToggle(false);
    ['keydown', 'keyup'].forEach(event => document.addEventListener(event, e => scrollToggle(e.ctrlKey)));

    map.events.add('wheel', () => !map.behaviors.isEnabled('scrollZoom') && blockToggle());
    parent.addEventListener('mouseleave', () => blockToggle(false));
  }

  if (prevTouch) {
    // todo перенести в blockToggle
    content.textContent = options.hasOwnProperty('textTouch') ? options.textTouch : 'Чтобы переместить карту проведите по ней двумя пальцами';

    map.behaviors.disable('drag');

    parent.addEventListener('touchstart', e => blockToggle(e.touches.length < 2));
    parent.addEventListener('touchend', () => blockToggle(false));
  }
}