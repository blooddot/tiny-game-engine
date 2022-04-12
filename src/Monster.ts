import GraphicImage from "./GraphicImage";

/**
 * @author 雪糕
 * @description 
 */
export default class Monster extends GraphicImage {
    public static MIN_Y = 50;
    public static MAX_Y = 300;
    private _ySpeed: number = 0;
    private _fallAccSpeed: number = 0.001;
    private _fallDefaultSpeed: number = 0.1;
    private _jumpAccSpeed: number = 0.0003;
    private _jumpDefaultSpeed: number = -0.5;
    private _xDefaultSpeed: number = 0.1;
    private _xAccSpeed: number = 0.002;
    private _dir: number = 1;
    public setDir(value: number) {
        this._dir = value;
    }

    private getXSpeed(deltaTime: number): number {
        const speed = this._xDefaultSpeed + this._xAccSpeed * deltaTime;
        return this._dir >= 0 ? speed : -speed;
    }

    private getYSpeed(deltaTime: number): number {
        if (this._ySpeed >= 0 && this._y >= Monster.MAX_Y) return this._jumpDefaultSpeed;
        if (this._ySpeed <= 0 && this._y <= Monster.MIN_Y) return this._fallDefaultSpeed;

        const accSpeed = this._ySpeed > 0 ? this._fallAccSpeed : this._jumpAccSpeed;
        this._ySpeed += accSpeed * deltaTime;
        return this._ySpeed;
    }

    protected onUpdate(deltaTime: number): void {
        this._ySpeed = this.getYSpeed(deltaTime);

        const x = this.x + deltaTime * this.getXSpeed(deltaTime);
        const y = this.y + deltaTime * this._ySpeed;
        this.setPos(x, y)
    }
}