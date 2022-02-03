declare class Snow {
    ctx: CanvasRenderingContext2D;
    w: number;
    g: number;
    f: number;
    pageW: number;
    pageH: number;
    color: string;
    opacity: number;
    mixColor: string;
    size: number;
    x: number;
    y: number;
    xv: number;
    yv: number;
    xPosition: number;
    yPosition: number;
    constructor(obj: any);
    getMixColor(): void;
    draw(ctx: CanvasRenderingContext2D): this;
    getHorizontalV(): void;
    getVerticalV(): void;
    checkOverScreen(): void;
    randomPosition(): void;
    update(): void;
}
declare class WSnow {
    animationKey: number;
    el: HTMLElement;
    canvasWidth: number;
    canvasHeight: number;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    wind: number;
    gravity: number;
    airResistance: number;
    sizeRange: number[];
    snowNum: number;
    snowList: Array<Snow>;
    snowColor: string;
    randomColor: boolean;
    constructor(obj: any);
    initCanvas(): void;
    randomHexColor(): string;
    initSnow(): void;
    updateSnow(): void;
    start(): void;
    stop(): void;
    destory(): void;
    restart(): void;
}
export default WSnow;