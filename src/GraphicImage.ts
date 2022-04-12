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

    render() {
        if (!this._img) return;

        Model.ctx.drawImage(this._img, this.globalX, this.globalY, this._img.width, this._img.height);
    }
}