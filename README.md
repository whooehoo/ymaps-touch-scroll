# ymaps-touch-scroll

Library add touch or/and scroll description block in ymaps

![Alt Text](https://github.com/whooehoo/ymaps-touch-scroll/raw/master/gif.gif)

## [DEMO](https://whooehoo.github.io/ymaps-touch-scroll/)

## Install:

### `npm` or `yarn`

```sh
npm i ymaps-touch-scroll

yarn add ymaps-touch-scroll
```

```js
var ymapsTouchScroll = require("ymaps-touch-scroll");

// ES6+
import ymapsTouchScroll from "ymaps-touch-scroll";
```

## Example:

```js
function mapInit() {
  var map = new ymaps.Map("map", {
    center: [55.76, 37.64],
    zoom: 10,
  });

  ymapsTouchScroll(map);
}

ymaps.ready(mapInit);
```

## Settings

| Option          | Default                                                               | Description               |
| --------------- | --------------------------------------------------------------------- | ------------------------- |
| `preventScroll` | `true`                                                                | Prevent scroll on desktop |
| `preventTouch`  | `true`                                                                | Prevent touch on mobile   |
| `textScroll`    | `Чтобы изменить масштаб, прокручивайте карту, удерживая клавишу Ctrl` | Touch block's text        |
| `textTouch`     | `Чтобы переместить карту проведите по ней двумя пальцами`             | Touch block's text        |
