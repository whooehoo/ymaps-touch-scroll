export default function ymapsTouchScroll(map, {
  preventScroll = true,
  preventTouch = true,
  textScroll = 'Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl',
  textTouch = 'Чтобы переместить карту проведите по ней двумя пальцами'
} = {}) {
  if ((typeof map !== 'object') || (!preventScroll && !preventTouch) || (typeof textScroll !== 'string') || (typeof textTouch !== 'string')) return;

  function createEl(appendBlock, attributes = {}, tag = 'div') {
    const el = document.createElement(tag);
    for (const attribute of Object.keys(attributes)) el[attribute] = attributes[attribute];
    appendBlock.appendChild(el);
    return el;
  }

  const parentEl = map.container.getParentElement();
  const mapEl = map.container.getElement();
  const isMobile = /Mobi/i.test(navigator.userAgent) || /Anroid/i.test(navigator.userAgent);
  let isBlockShow = false;

  if (getComputedStyle(parentEl).position === 'static') parentEl.style.position = 'relative';

  const css = '.ymaps-touch-scroll{position:absolute;top:0;left:0;transition:opacity .2s;width:100%;height:100%;overflow:hidden;z-index:-2147483648}' +
    '.ymaps-touch-scroll:before{content:"";display:inline-block;vertical-align:middle;height:100%}' +
    '.ymaps-touch-scroll-bg{position:absolute;top:0;left:0;background:#000;height:100%;width:100%}' +
    '.ymaps-touch-scroll-content{position:relative;display:inline-block;vertical-align:middle;width:100%;color:#fff;text-align:center;box-sizing:border-box}';
  const style = createEl(document.head, {type: 'text/css'}, 'style');
  style.appendChild(document.createTextNode(css));

  const block = createEl(parentEl, {className: 'ymaps-touch-scroll'});
  const bg = createEl(block, {className: 'ymaps-touch-scroll-bg'});
  const content = createEl(block, {className: 'ymaps-touch-scroll-content'});

  mapEl.style.transition = 'opacity .2s';
  const margin = map.margin.getMargin();
  for (const i in margin) margin[i] += 20;
  content.style.padding = margin.join('px ') + 'px';
  content.textContent = isMobile ? textTouch : textScroll;

  function blockToggle(show = true) {
    if ((show && isBlockShow) || (!show && !isBlockShow)) return;
    isBlockShow = show;

    block.style.opacity = show ? '1' : '0';
    mapEl.style.opacity = show ? '.3' : '1';
  }

  if (preventScroll && !isMobile) {
    let isCtrlPress = false;
    let isScrollOn = true;

    document.addEventListener('keydown', e => {
      isCtrlPress = e.keyCode === 17;
      if (isCtrlPress) blockToggle(false);
    });

    document.addEventListener('keyup', e => {
      if (e.keyCode === 17) isCtrlPress = false;
    });

    function scrollToggle(on = true) {
      if ((on && isScrollOn) || (!on && !isScrollOn)) return;
      isScrollOn = on;
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

  if (preventTouch && isMobile) {
    function touchToggle(on = true) {
      on ? map.behaviors.enable('drag') : map.behaviors.disable('drag');
    }

    touchToggle(false);

    ymaps.domEvent.manager.add(mapEl, 'touchmove', e => {
      const twoFingers = e.get('touches').length === 2;
      blockToggle(!twoFingers);
      touchToggle(twoFingers);
    });

    ymaps.domEvent.manager.add(mapEl, 'touchend', () => {
      blockToggle(false);
    });
  }
}