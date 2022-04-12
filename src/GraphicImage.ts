import GraphicNode from './GraphicNode';
import Model from './Model';
/**
 * @author 雪糕
 * @description 
 */
export default class GraphicImage extends GraphicNode {
    private _img: HTMLImageElement;
    public get img() {
        if (this._img) return this._img;

        this._img = new Image();
        this._img.onload = () => {
            this._width = this._width || this._img.width;
            this._height = this._height || this._img.height;
            Model.dirty = true;
        }
        return this._img;
    }

    private _source: string;
    public set source(value: string) {
        if (this._source === value) return;

        this.img.src = this._source = value;
        Model.dirty = true;
    }

    constructor(source: string) {
        super();
        if (source) {
            this.source = source;
        }
    }

    private _width: number;
    public get width(): number {
        return this._width;
    }
    private _height: number;
    public get height(): number {
        return this._height;
    }
    public setSize(width: number, height: number) {
        if (this._width === width && this._height === height) return;

        this._width = width;
        this._height = height;
        Model.dirty = true;
    }

    render() {
        if (!this._img) return;

        Model.ctx.drawImage(this._img, this.globalX, this.globalY, this._width, this._height);
    }
}