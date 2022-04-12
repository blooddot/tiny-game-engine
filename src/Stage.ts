import GraphicImage from "./GraphicImage";
import GraphicNode from "./GraphicNode";

/**
 * @author 雪糕
 * @description 
 */
export default class Stage extends GraphicNode {
    public constructor() {
        super();
        const background = new GraphicImage('./resource/background.jpg');
        this.addChild(background);
    }
}