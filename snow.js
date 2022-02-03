"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Snow = /** @class */ (function () {
    function Snow(obj) {
        this.w = 0; // wind
        this.g = 0; // gravity
        this.f = 0; // airResistance
        this.pageW = 0; // page width
        this.pageH = 0; // page height
        this.color = '#ffffff';
        this.opacity = 0;
        this.mixColor = '';
        this.size = 10;
        this.x = 0;
        this.y = 0;
        this.xv = 0;
        this.yv = 0;
        this.xPosition = 0;
        this.yPosition = 0;
        this.ctx = obj.ctx;
        this.g = obj.gravity;
        this.f = obj.airResistance / 2 * Math.PI * Math.pow(obj.size, 2) * Math.random();
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
    Snow.prototype.getMixColor = function () {
        this.mixColor = this.color + Number(this.opacity * 255).toString(16).slice(0, 2);
    };
    Snow.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = 'transparent';
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.mixColor;
        ctx.fillStyle = this.mixColor;
        ctx.arc(this.xPosition, this.yPosition, this.size, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        return this;
    };
    Snow.prototype.getHorizontalV = function () {
        var a = this.w - this.f * Math.pow(this.xv, 2);
        if (a < 0)
            a = 0;
        this.xv += a;
    };
    Snow.prototype.getVerticalV = function () {
        var a = this.g - this.f * Math.pow(this.yv, 2);
        if (a < 0)
            a = 0;
        this.yv += a;
    };
    Snow.prototype.checkOverScreen = function () {
        if (this.yPosition > this.pageH) {
            this.yPosition = this.y;
            this.yv = 0;
            this.xPosition = this.x;
            this.xv = 0;
        }
        if (this.xPosition > this.pageW) {
            this.xPosition -= this.pageW;
        }
    };
    Snow.prototype.randomPosition = function () {
        var count = Math.round(Math.random() * 1000);
        for (var i = 0; i < count; i++) {
            this.getHorizontalV();
            this.getVerticalV();
            this.xPosition += this.xv;
            this.yPosition += this.yv;
            this.checkOverScreen();
        }
        this.draw(this.ctx);
    };
    Snow.prototype.update = function () {
        this.getHorizontalV();
        this.getVerticalV();
        this.xPosition += this.xv;
        this.yPosition += this.yv;
        this.checkOverScreen();
        this.draw(this.ctx);
    };
    return Snow;
}());
var WSnow = /** @class */ (function () {
    function WSnow(obj) {
        this.animationKey = 0;
        this.canvasWidth = 0;
        this.canvasHeight = 0;
        this.wind = 10;
        this.gravity = 10;
        this.airResistance = .02;
        this.sizeRange = [2, 5];
        this.snowNum = 100;
        this.snowList = [];
        this.snowColor = '#ffffff';
        this.randomColor = false;
        this.el = obj.el;
        if (!this.el) {
            throw console.error('need a htmlnode');
        }
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
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
    WSnow.prototype.initCanvas = function () {
        !this.canvas && (this.canvas = document.createElement('canvas'));
        !this.ctx && (this.ctx = this.canvas.getContext('2d'));
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.setAttribute('style', "pointer-events: none;position: absolute;left: 0;top: 0");
        this.el.appendChild(this.canvas);
    };
    WSnow.prototype.randomHexColor = function () {
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
    };
    WSnow.prototype.initSnow = function () {
        for (var i = 0; i < this.snowNum; i++) {
            var size = Math.round(Math.random() * 10) / 10 * (this.sizeRange[1] - this.sizeRange[0]) + this.sizeRange[0];
            var opacity = Math.floor(Math.random() * 100) / 100;
            var snow = new Snow({
                ctx: this.ctx,
                gravity: this.gravity,
                airResistance: this.airResistance,
                wind: this.wind,
                color: this.randomColor ? this.randomHexColor() : this.snowColor,
                opacity: opacity,
                size: size,
                pageWidth: this.canvasWidth,
                pageHeight: this.canvasHeight,
            });
            this.snowList.push(snow);
        }
    };
    WSnow.prototype.updateSnow = function () {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.snowList.forEach(function (item) {
            item.update();
        });
        this.animationKey = requestAnimationFrame(this.updateSnow.bind(this));
    };
    WSnow.prototype.start = function () {
        this.animationKey = requestAnimationFrame(this.updateSnow.bind(this));
    };
    WSnow.prototype.stop = function () {
        cancelAnimationFrame(this.animationKey);
    };
    WSnow.prototype.destory = function () {
        this.stop();
        this.snowList = [];
        this.el && this.el.removeChild(this.canvas);
    };
    WSnow.prototype.restart = function () {
        this.initCanvas();
        this.initSnow();
        this.start();
    };
    return WSnow;
}());
exports.default = WSnow;
