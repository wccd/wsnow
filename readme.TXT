import WSnow from 'wsnow/dist/snow.js'

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
