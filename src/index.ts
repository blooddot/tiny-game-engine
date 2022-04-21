import Model from "./Model";
import Stage from "./Stage";

/**
 * @author 雪糕
 * @description 
 */
const canvas = document.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
Model.setCtx(canvas.getContext('2d') as CanvasRenderingContext2D);
canvas.width = Model.CANVAS_WIDTH;
canvas.height = Model.CANVAS_HEIGHT;

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

    const msTime = Math.min(MS_PER_UPDATE, timestamp)
    while (remainTime >= msTime) {
        update(deltaTime);
        remainTime -= msTime;
    }

    render();
    requestAnimationFrame(onTick);
}

function update(deltaTime: number) {
    stage.$update(deltaTime);
}

function render() {
    if (!Model.dirty) return;

    Model.dirty = false;
    stage.render();
}