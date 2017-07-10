# ymaps-touch-scroll
Library add touch description block in ymaps on devices

![Alt Text](https://github.com/whooehoo/ymaps-touch-scroll/docs/gif.gif)

## [DEMO](https://whooehoo.github.io/ymaps-touch-scroll/)

## Install:

### npm or yarn

```sh
npm i ymaps-touch-scroll --save

yarn add ymaps-touch-scroll --save
```

```js
var ymapsTouchScroll = require('ymaps-touch-scroll');

// ES6
import ymapsTouchScroll from 'ymaps-touch-scroll';
```

### `<script>` old school 

```bash
# bash
git clone git@github.com:whooehoo/ymaps-touch-scroll.git
```

```html
<!-- HTML -->
<script src="path/to/folder/ymaps-touch-scroll/dist/ymaps-touch-scroll.bundle.min.js"></script>
```

## Example:

```js
function mapInit() {
  var map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 10
  });

  ymapsTouchScroll(map);
}

ymaps.ready(mapInit);
```

## Settings

Option | Default | Description
---------|-----------------------|---------
`text` | `Чтобы переместить карту проведите по ней двумя пальцами` | Touch block's text