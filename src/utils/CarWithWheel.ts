import * as BABYLON from 'babylonjs'

export const createScene = (engine: BABYLON.Engine, canvas: HTMLCanvasElement) => {
    const scene = new BABYLON.Scene(engine)

    const camera = new BABYLON.ArcRotateCamera('camera', -Math.PI /2, Math.PI / 2.5, 1.5, new BABYLON.Vector3(0,0,0))
    camera.attachControl(canvas, true)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    BABYLON.SceneLoader.ImportMeshAsync('', '/model/car.babylon').then(() => {
      const wheelRB = scene.getMeshByName("wheelRB");
      const wheelRF = scene.getMeshByName("wheelRF");
      const wheelLB = scene.getMeshByName("wheelLB");
      const wheelLF = scene.getMeshByName("wheelLF");
      scene.beginAnimation(wheelRB, 0, 30, true);
      scene.beginAnimation(wheelRF, 0, 30, true);
      scene.beginAnimation(wheelLB, 0, 30, true);
      scene.beginAnimation(wheelLF, 0, 30, true);
    })

    return scene
}