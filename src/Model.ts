/**
 * @author 雪糕
 * @description 
 */
export default class Model {
    static dirty = false;
    private static _ctx: CanvasRenderingContext2D;
    public static get ctx(): CanvasRenderingContext2D {
        return this._ctx;
    }
    public static setCtx(value: CanvasRenderingContext2D) {
        this._ctx = value;
    }

    public static CANVAS_WIDTH = 1000;
    public static CANVAS_HEIGHT = 500;
}