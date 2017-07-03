import isMobile from 'ismobilejs/isMobile.min';

export default function ymapsTouchScroll(map, options = {}) {
  if (!isMobile.any || !map.behaviors.isEnabled('multiTouch')) return;

  map.behaviors.disable('drag');

  const parentBlock = map.container.getParentElement();

  if (!getComputedStyle(parentBlock).position) parentBlock.style.position = 'relative';

  function createEl(elClass, appendBlock, elStyles) {
    const el = document.createElement('div');

    for (const key in elStyles) el.style[key] = elStyles[key];

    el.classList.add(elClass);

    appendBlock.appendChild(el);

    return el;
  }

  const mapZIndex = getComputedStyle(map.container.getElement()).zIndex;

  const block = createEl('ymaps-touch-scroll', parentBlock, {
    position: 'absolute',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    zIndex: mapZIndex - 1
  });

  const bg = createEl('ymaps-touch-scroll-bg', block, {
    background: '#000',
    opacity: '0',
    width: '100%',
    height: '100%',
    transition: 'opacity .1s ease-in-out'
  });

  const mapMargin = map.margin.getMargin();
  for (const i in mapMargin) mapMargin[i] += 20;

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
    padding: mapMargin.join('px ') + 'px'
  });

  content.textContent = options.hasOwnProperty('text') ? options.text : 'Чтобы переместить карту проведите по ней двумя пальцами';

  function blockToggle(show = true) {
    block.style.zIndex = show ? mapZIndex : mapZIndex - 1;
    bg.style.opacity = show ? '.5' : 0;
  }

  parentBlock.addEventListener('touchmove', () => blockToggle());

  parentBlock.addEventListener('touchend', () => blockToggle(false));
}