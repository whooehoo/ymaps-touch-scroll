import ymapsTouchScroll from './ymaps-touch-scroll';

function ready() {
  function mapInit() {
    const map = new ymaps.Map('map', {
      center: [55.76, 37.64],
      zoom: 10
    });

    ymapsTouchScroll(map);
  }

  ymaps.ready(mapInit);
}

document.addEventListener('DOMContentLoaded', ready);

import 'normalize.css';
import './slyles.css';