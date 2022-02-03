class Snow {
    ctx: CanvasRenderingContext2D
    w = 0 // wind
    g = 0 // gravity
    f = 0 // airResistance
    pageW = 0 // page width
    pageH = 0 // page height
    color = '#ffffff'
    opacity = 0
    mixColor = ''
    size = 10
    x = 0 
    y = 0
    xv = 0 
    yv = 0
    xPosition = 0
    yPosition = 0

    constructor(obj: any) {
        this.ctx = obj.ctx;
        this.g = obj.gravity;
        this.f = obj.airResistance / 2 * Math.PI * obj.size ** 2 * Math.random()
        this.w = obj.wind;
        this.color = obj.color || '#ffffff';
        this.opacity = obj.opacity || 0.95;
        this.size = obj.size || 10;
        this.x = obj.pageWidth * Math.floor(Math.random() * 100) / 100;
        this.y = obj.pageHeight / 2 * Math.floor((Math.random() - 1) * 100) / 100;
        this.xPosition = this.x;
        this.yPosition = this.y;
        this.pageW = obj.pageWidth;
        this.pageH = obj.pageHeight;
        this.getMixColor();
        this.randomPosition();
    }

    getMixColor() {
        this.mixColor = this.color + Number(this.opacity * 255).toString(16).slice(0, 2)
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.mixColor;
        ctx.fillStyle = this.mixColor;
        ctx.arc(this.xPosition, this.yPosition, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        return this
    }

    getHorizontalV() {
        let a = this.w - this.f * this.xv ** 2;
        if(a < 0) a = 0;
        this.xv += a;
    }

    getVerticalV() {
        let a = this.g - this.f * this.yv ** 2;
        if(a < 0) a = 0;
        this.yv += a;
    }
    
    checkOverScreen() {
        if(this.yPosition > this.pageH) {
            this.yPosition = this.y;
            this.yv = 0;
            this.xPosition = this.x;
            this.xv = 0;
        }
        if(this.xPosition > this.pageW) {
            this.xPosition -= this.pageW
        }
    }

    randomPosition() {
        let count = Math.round(Math.random() * 1000);
        for(let i = 0; i < count; i++) {
            this.getHorizontalV();
            this.getVerticalV();
            this.xPosition += this.xv;
            this.yPosition += this.yv;
            this.checkOverScreen();
        }
        this.draw(this.ctx);
    }

    update() {
        this.getHorizontalV();
        this.getVerticalV();
        this.xPosition += this.xv;
        this.yPosition += this.yv;
        this.checkOverScreen();
        this.draw(this.ctx);
    }
}

class WSnow {
    animationKey = 0
    el: HTMLElement
    canvasWidth = 0
    canvasHeight = 0
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    wind = 10
    gravity = 10
    airResistance = .02
    sizeRange = [2, 5]
    snowNum = 100
    snowList: Array<Snow> = []
    snowColor = '#ffffff'
    randomColor: boolean = false
    
    constructor(obj: any) {
        this.el = obj.el;
        if(!this.el) {
            throw console.error('need a htmlnode');
        }
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D;
        this.canvasWidth = obj.width || 800;
        this.canvasHeight = obj.height || 480;
        this.gravity = obj.gravity / 1000;
        this.wind = obj.wind / 2000;
        this.airResistance = obj.airResistance / 10000;
        this.snowNum = obj.snowNum;
        this.snowColor = obj.snowColor || '#ffffff';
        this.randomColor = obj.randomColor || false;
        this.initCanvas();
        this.initSnow();
    }

    initCanvas() {
        !this.canvas && (this.canvas = document.createElement('canvas'));
        !this.ctx && (this.ctx = this.canvas.getContext( '2d' ) as CanvasRenderingContext2D);
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.setAttribute('style', "pointer-events: none;position: absolute;left: 0;top: 0");
        this.el.appendChild(this.canvas);
    }

    randomHexColor() { 
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    }

    initSnow() {
        for(let i = 0; i < this.snowNum; i++) {
            let size = Math.round(Math.random() * 10) / 10 * (this.sizeRange[1] - this.sizeRange[0]) + this.sizeRange[0];
            let opacity = Math.floor(Math.random() * 100) / 100;
            let snow = new Snow({
                ctx: this.ctx,
                gravity: this.gravity,
                airResistance: this.airResistance,
                wind: this.wind,
                color: this.randomColor ? this.randomHexColor() : this.snowColor,
                opacity,
                size,
                pageWidth: this.canvasWidth,
                pageHeight: this.canvasHeight,
            })
            this.snowList.push(snow)
        }
    }

    updateSnow() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.snowList.forEach((item: Snow) => {
            item.update();
        })
        this.animationKey = requestAnimationFrame(this.updateSnow.bind(this));
    }

    start() {
        this.animationKey = requestAnimationFrame(this.updateSnow.bind(this));
    }

    stop() {
        cancelAnimationFrame(this.animationKey);
    }

    destory() {
        this.stop();
        this.snowList = [];
        this.el && this.el.removeChild(this.canvas);
    }

    restart() {
        this.initCanvas();
        this.initSnow();
        this.start();
    }

    
}
export default WSnow