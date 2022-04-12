import Model from "./Model";
import Stage from "./Stage";

/**
 * @author 雪糕
 * @description 
 */
const canvas = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
Model.setCtx(canvas.getContext('2d') as CanvasRenderingContext2D);
canvas.width = 500;
canvas.height = 500;

const stage = new Stage();

let preTimestamp: number;
const MS_PER_UPDATE = 1000 / 60;
let remainTime = 0;

//自定义帧率
requestAnimationFrame(onTick);
function onTick(timestamp: number) {
    if (!preTimestamp) {
        preTimestamp = timestamp;
    }
    const deltaTime = timestamp - preTimestamp;
    preTimestamp = timestamp;
    remainTime += deltaTime;

    while (remainTime >= MS_PER_UPDATE) {
        update(deltaTime);
        remainTime -= MS_PER_UPDATE;
    }
    requestAnimationFrame(onTick);
}

function update(deltaTime: number) {
    if (Model.dirty) {
        Model.dirty = false;
        stage.render();
    }
}