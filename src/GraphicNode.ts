import Model from './Model';
/**
 * @author 雪糕
 * @description 
 */
export default class GraphicNode {
    private _parent: GraphicNode;
    public setParent(value: GraphicNode) {
        if (this._parent === value) return;

        this._parent = value;
        Model.dirty = true;
    }

    protected _x = 0;
    public get x(): number {
        return this._x;
    }
    protected _y = 0;
    public get y(): number {
        return this._y;
    }
    public setPos(x: number, y: number) {
        this._x = x;
        this._y = y;
        Model.dirty = true;
    }

    public get globalX(): number {
        return this._x + this._parent?.globalX || 0;
    }

    public get globalY(): number {
        return this._y + this._parent?.globalY || 0;
    }

    private _children: GraphicNode[] = [];
    public addChild(value: GraphicNode): void {
        this._children.push(value);
        value.setParent(this);
        Model.dirty = true;
    }

    public removeChild(value: GraphicNode): void {
        const index = this._children.indexOf(value);
        if (index < 0) return;

        this._children.splice(index, 1);
        Model.dirty = true;
    }

    public render() {
        if (!this._children.length) return;

        this._children.forEach(child => child.render());
    }

    public $update(deltaTime: number) {
        this._children.forEach(child => child.$update(deltaTime));

        this.onUpdate(deltaTime);
    }

    protected onUpdate(deltaTime: number): void {
        //
    }
}