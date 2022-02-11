
# wsnow

A snow animation with canvas
DEMO: <a href="https://wccd.github.io/wsnow/">wsnow</a>

## Install

```bash
$ npm install wsnow
```


## Use

```js
import WSnow from 'wsnow'

let wSnow = new WSnow({
    el: htmlElement,        // HTMLElement
    width: 1000,            // number
    height: 480,            // number
    gravity: 5,             // number 
    wind: 5,                // number
    airResistance: 2,       // number
    snowNum: 50,            // number
    snowColor: '#ffffff',   // string
    randomColor: false,     // boolean
})
wSnow.start();    // start 
wSnow.stop();     // stop
wSnow.destory();  // destory
wSnow.restart();  // restart

```

let wSnow = new WSnow({
    el: htmlElement,        // HTMLElement
    width: 1000,            // number
    height: 480,            // number
    gravity: 5,             // number 
    wind: 5,                // number
    airResistance: 2,       // number
    snowNum: 50,            // number
    snowColor: '#ffffff',   // string
    randomColor: false,     // boolean
})
wSnow.start();    // start 
wSnow.stop();     // stop
wSnow.destory();  // destory
wSnow.restart();  // restart