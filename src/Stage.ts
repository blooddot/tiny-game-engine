import GraphicImage from "./GraphicImage";
import GraphicNode from "./GraphicNode";
import Model from "./Model";
import Monster from "./Monster";

/**
 * @author 雪糕
 * @description 
 */
export default class Stage extends GraphicNode {
    private _monster: Monster;
    private _star: GraphicImage;

    public constructor() {
        super();

        this.initView();
        this.initEvent();
    }

    private initView(): void {
        const background = new GraphicImage('./resource/background.jpg');
        this.addChild(background);
        background.setSize(Model.CANVAS_WIDTH, Model.CANVAS_HEIGHT);

        const ground = new GraphicImage('./resource/ground.png');
        this.addChild(ground);
        ground.setPos(0, Model.CANVAS_HEIGHT - 150);
        ground.setSize(Model.CANVAS_WIDTH, 150);

        this._monster = new Monster('./resource/monster.png');
        this.addChild(this._monster);

        this.addStar();
    }

    private addStar(): void {
        this._star = new GraphicImage('./resource/star.png');
        this.addChild(this._star);
        this._star.setPos(50 + Math.random() * (Model.CANVAS_WIDTH - 100), 50 + Math.random() * (Model.CANVAS_HEIGHT - 200));
    }

    private initEvent(): void {
        const halfWidth = Model.CANVAS_WIDTH / 2;
        document.addEventListener("mousedown", (evt: MouseEvent) => {
            const dir = evt.clientX >= halfWidth ? 1 : -1;
            this._monster.setDir(dir);
        });
    }

    public $update(deltaTime: number): void {
        super.$update(deltaTime);

        if (!this.checkHitStar()) return;

        this.destroyStar();
        setTimeout(() => {
            this.addStar();
        }, 1000);
    }

    public render(): void {
        Model.ctx.clearRect(0, 0, Model.CANVAS_WIDTH, Model.CANVAS_HEIGHT);
        super.render();
    }

    private checkHitStar(): boolean {
        if (!this._monster || !this._star) return false;
        if (!this._monster.width || !this._monster.height) return false;
        if (!this._star.width || !this._star.height) return false;

        if (Math.abs(this._monster.globalX - this._star.globalX) < this._monster.width / 2 + this._star.width / 2
            && Math.abs(this._monster.globalY - this._star.globalY) < this._monster.height / 2 + this._star.height / 2) {
            return true;
        }

        return false;
    }

    private destroyStar(): void {
        if (!this._star) return;
        this.removeChild(this._star);
        this._star = null;
    }
}