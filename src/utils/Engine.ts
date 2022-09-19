import * as BABYLON from 'babylonjs'
import { Scene, Engine, Camera, Light, GroundMesh } from 'babylonjs'

const createScene = function (engine: Engine, canvas: HTMLCanvasElement):Scene {
    const scene = new BABYLON.Scene(engine);

    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "box.babylon");

    const camera :Camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.attachControl(canvas, true);
    const light :Light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);
    const ground:GroundMesh = BABYLON.MeshBuilder.CreateGround('ground', { width: 10, height: 10})
    return scene;
};
export function init(id:string):void {
    const canvas: HTMLCanvasElement = document.getElementById(id) as HTMLCanvasElement
    const engine :Engine = new BABYLON.Engine(canvas, true)
    const scene:Scene = createScene(engine, canvas)
    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });
}

