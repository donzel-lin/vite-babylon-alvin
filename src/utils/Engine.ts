import * as BABYLON from 'babylonjs'
import { Scene, Engine, Camera, Light, GroundMesh } from 'babylonjs'

const createScene = function (engine: Engine, canvas: HTMLCanvasElement, cb: Function):Scene {
    const scene = new BABYLON.Scene(engine);
    const camera :Camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light :Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    // 自己的代码
    cb(scene)
    return scene;
};
export function init(id:string, cb: Function):void {
    const canvas: HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement
    const engine :Engine = new BABYLON.Engine(canvas, true)
    const scene:Scene = createScene(engine, canvas, cb)
    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

